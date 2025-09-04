import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      clientID: configService.getOrThrow('GOOGLE_AUTH_CLIENT_ID'),
      clientSecret: configService.getOrThrow('GOOGLE_AUTH_CLIENT_SECRET'),
      callbackURL: configService.getOrThrow('GOOGLE_AUTH_REDIRECT_URI'),
      scope: ['profile', 'email'],
    });
  }

  async validate(_accessToken: string, _refreshToken: string, profile: any) {
    // Extract user information from Google profile
    const email = profile.emails[0]?.value;
    const firstName = profile.name?.givenName || 'Unknown';
    const lastName = profile.name?.familyName || 'User';
    
    // For Google OAuth users, we need to set a default tenant and role
    // In a real application, you might want to handle tenant selection differently
    const defaultTenantId = process.env.DEFAULT_TENANT_ID || 'default-tenant';
    
    return this.usersService.getOrCreateUser({
      email,
      password: '', // OAuth users don't have passwords
      firstName,
      lastName,
      role: 'EMPLOYEE', // Default role for OAuth users
      tenantId: defaultTenantId,
    });
  }
}
