import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
  @ApiProperty({
    description: 'Authentication success message',
    example: 'Login successful',
  })
  message: string;

  @ApiProperty({
    description: 'User information',
    type: 'object',
    properties: {
      id: { type: 'string', example: 'clx1234567890abcdef' },
      email: { type: 'string', example: 'user@example.com' },
      role: { type: 'string', example: 'TENANT_ADMIN' },
    },
  })
  user: {
    id: string;
    email: string;
    role: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    department?: string;
    jobTitle?: string;
  };

  @ApiProperty({
    description: 'Tenant information',
    type: 'object',
    properties: {
      id: { type: 'string', example: 'tenant-equity-bank' },
      name: { type: 'string', example: 'Equity Bank Kenya' },
      slug: { type: 'string', example: 'equity-bank-ke' },
    },
  })
  tenant: {
    id: string;
    name: string;
    slug: string;
  };
}
