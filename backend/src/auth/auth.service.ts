import { Injectable, UnauthorizedException, ConflictException, BadRequestException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { TenantsService } from '../tenants/tenants.service';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { User, UserRole } from '@prisma/client';
import { Response } from 'express';
import { TokenPayload } from './token-payload.interface';
import { SignupRequest } from './dto/signup.request';
import { ForgotPasswordRequest } from './dto/forgot-password.request';
import { ResetPasswordRequest } from './dto/reset-password.request';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tenantsService: TenantsService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async login(user: User, response: Response, redirect = false) {
    const expiresAccessToken = new Date();
    expiresAccessToken.setMilliseconds(
      expiresAccessToken.getTime() +
        parseInt(
          this.configService.getOrThrow<string>(
            'JWT_ACCESS_TOKEN_EXPIRATION_MS',
          ),
        ),
    );

    const expiresRefreshToken = new Date();
    expiresRefreshToken.setMilliseconds(
      expiresRefreshToken.getTime() +
        parseInt(
          this.configService.getOrThrow<string>(
            'JWT_REFRESH_TOKEN_EXPIRATION_MS',
          ),
        ),
    );

    const tokenPayload: TokenPayload = {
      userId: user.id,
    };

    const accessToken = this.jwtService.sign(tokenPayload, {
      secret: this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.getOrThrow('JWT_ACCESS_TOKEN_EXPIRATION_MS')}ms`,
    });

    const refreshToken = this.jwtService.sign(tokenPayload, {
      secret: this.configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.getOrThrow('JWT_REFRESH_TOKEN_EXPIRATION_MS')}ms`,
    });

    await this.usersService.updateUser(
      { id: user.id },
      { refreshToken: await hash(refreshToken, 10) },
    );

    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      expires: expiresAccessToken,
    });
    response.cookie('Refresh', refreshToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      expires: expiresRefreshToken,
    });

    if (redirect) {
      response.redirect(this.configService.getOrThrow('AUTH_UI_REDIRECT'));
    }
  }

  async verifyUser(email: string, password: string) {
    try {
      console.log('🔍 Verifying user with email:', email);
      const user = await this.usersService.getUser({
        email,
      });
      console.log('👤 User found:', user ? 'Yes' : 'No', user?.email);
      const authenticated = await compare(password, user.password);
      console.log('🔐 Password match:', authenticated);
      if (!authenticated) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (error) {
      console.log('❌ Verify user error:', error.message);
      throw new UnauthorizedException('Credentials are not valid.');
    }
  }
  async verifyUserRefreshToken(refreshToken: string, userId: string) {
    try {
      const user = await this.usersService.getUser({ id: userId });
      
      if (!user.refreshToken) {
        throw new UnauthorizedException('No refresh token found');
      }
      
      const authenticated = await compare(refreshToken, user.refreshToken);
      if (!authenticated) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('Refresh token is not valid');
    }
  }

  async signup(signupData: SignupRequest, response: Response): Promise<User> {
    // Check if user already exists
    const existingUser = await this.prisma.user.findFirst({
      where: { email: signupData.email },
    });
  
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
  
    // Hash password 🔑
    const hashedPassword = await hash(signupData.password, 10);
  
    // Create tenant (organization)
    const tenant = await this.tenantsService.create({
      name: signupData.organization,
      type: signupData.organizationType,
      email: signupData.email,
      phone: signupData.phone,
    });
  
    // Create user with hashed password
    const user = await this.usersService.create({
      email: signupData.email,
      password: hashedPassword, // 👈 save hash, not raw password
      firstName: signupData.firstName,
      lastName: signupData.lastName,
      role: UserRole.TENANT_ADMIN, // First user becomes tenant admin
      tenantId: tenant.id,
      phone: signupData.phone,
    });
  
    // Auto login after signup
    await this.login(user, response);

    // Send welcome email
    try {
      await this.emailService.sendWelcomeEmail(
        user.email,
        user.firstName,
        tenant.name
      );
    } catch (error) {
      console.error('Failed to send welcome email:', error);
      // Don't fail signup if email fails
    }
  
    return user;
  }

  async getUserTenant(userId: string) {
    const user = await this.usersService.getUser({ id: userId });
    if (!user.tenantId) {
      throw new Error('User has no tenant assigned');
    }
    
    const tenant = await this.prisma.tenant.findUnique({
      where: { id: user.tenantId },
      select: { id: true, name: true, slug: true }
    });
    
    if (!tenant) {
      throw new Error('Tenant not found');
    }
    
    return tenant;
  }

  async forgotPassword(forgotPasswordData: ForgotPasswordRequest): Promise<{ message: string }> {
    const { email } = forgotPasswordData;

    try {
      // Find user by email (without tenant filtering for password reset)
      const user = await this.prisma.user.findFirst({
        where: { email },
        include: { tenant: true }
      });

      if (!user) {
        // Don't reveal if user exists or not for security
        return { message: 'If an account with that email exists, a password reset link has been sent.' };
      }

      // Generate reset token
      const resetToken = randomBytes(32).toString('hex');
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 1); // Token expires in 1 hour

      // Save reset token to database
      await this.prisma.passwordResetToken.create({
        data: {
          token: resetToken,
          userId: user.id,
          expiresAt,
        },
      });

      // Send password reset email
      await this.emailService.sendPasswordResetEmail(
        user.email,
        resetToken,
        user.firstName
      );

      return { message: 'If an account with that email exists, a password reset link has been sent.' };
    } catch (error) {
      console.error('Error in forgot password:', error);
      return { message: 'If an account with that email exists, a password reset link has been sent.' };
    }
  }

  async resetPassword(resetPasswordData: ResetPasswordRequest): Promise<{ message: string }> {
    const { token, newPassword } = resetPasswordData;

    try {
      // Find valid reset token
      const resetToken = await this.prisma.passwordResetToken.findFirst({
        where: {
          token,
          used: false,
          expiresAt: {
            gt: new Date(), // Token not expired
          },
        },
        include: { user: true },
      });

      if (!resetToken) {
        throw new BadRequestException('Invalid or expired reset token');
      }

      // Hash new password
      const hashedPassword = await hash(newPassword, 10);

      // Update user password
      await this.prisma.user.update({
        where: { id: resetToken.userId },
        data: {
          password: hashedPassword,
          passwordChangedAt: new Date(),
        },
      });

      // Mark token as used
      await this.prisma.passwordResetToken.update({
        where: { id: resetToken.id },
        data: { used: true },
      });

      // Invalidate all other reset tokens for this user
      await this.prisma.passwordResetToken.updateMany({
        where: {
          userId: resetToken.userId,
          used: false,
        },
        data: { used: true },
      });

      return { message: 'Password has been reset successfully' };
    } catch (error) {
      console.error('Error in reset password:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to reset password');
    }
  }

  async validateResetToken(token: string): Promise<{ valid: boolean; message?: string }> {
    try {
      const resetToken = await this.prisma.passwordResetToken.findFirst({
        where: {
          token,
          used: false,
          expiresAt: {
            gt: new Date(),
          },
        },
      });

      if (!resetToken) {
        return { valid: false, message: 'Invalid or expired reset token' };
      }

      return { valid: true };
    } catch (error) {
      console.error('Error validating reset token:', error);
      return { valid: false, message: 'Invalid reset token' };
    }
  }
}
