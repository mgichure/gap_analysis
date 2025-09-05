import { Controller, Get, Post, Res, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { User } from '@prisma/client';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBody,
  ApiBearerAuth,
  ApiOkResponse 
} from '@nestjs/swagger';
import { LoginRequest } from './dto/login.request';
import { AuthResponse } from './dto/auth.response';
import { SignupRequest } from './dto/signup.request';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'User signup with organization' })
  @ApiBody({ type: SignupRequest })
  @ApiOkResponse({ 
    description: 'Signup successful',
    type: AuthResponse 
  })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid input data' })
  @ApiResponse({ status: 409, description: 'Conflict - User or organization already exists' })
  async signup(
    @Body() signupData: SignupRequest,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.signup(signupData, response);
    return { message: 'Signup successful', user: { id: result.id, email: result.email } };
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginRequest })
  @ApiOkResponse({ 
    description: 'Login successful',
    type: AuthResponse 
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid credentials' })
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);
    
    // Get tenant information
    const tenant = await this.authService.getUserTenant(user.id);
    
    return { 
      message: 'Login successful', 
      user: { 
        id: user.id, 
        email: user.email, 
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        department: user.department,
        jobTitle: user.jobTitle
      },
      tenant: { id: tenant.id, name: tenant.name, slug: tenant.slug }
    };
  }

  @Post('refresh')
  @UseGuards(JwtRefreshAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiOkResponse({ 
    description: 'Token refreshed successfully',
    type: AuthResponse 
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid refresh token' })
  async refreshToken(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);
    return { message: 'Token refreshed successfully', user: { id: user.id, email: user.email } };
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'Initiate Google OAuth login' })
  @ApiResponse({ status: 302, description: 'Redirects to Google OAuth' })
  loginGoogle() {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user information' })
  @ApiOkResponse({ 
    description: 'Current user information',
    type: AuthResponse 
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getCurrentUser(@CurrentUser() user: User) {
    // Get tenant information
    const tenant = await this.authService.getUserTenant(user.id);
    
    return { 
      message: 'User information retrieved successfully', 
      user: { 
        id: user.id, 
        email: user.email, 
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        department: user.department,
        jobTitle: user.jobTitle
      },
      tenant: { id: tenant.id, name: tenant.name, slug: tenant.slug }
    };
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'Google OAuth callback' })
  @ApiResponse({ status: 302, description: 'Redirects to frontend after successful authentication' })
  async googleCallBack(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response, true);
  }
}
