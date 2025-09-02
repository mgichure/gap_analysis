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
    },
  })
  user: {
    id: string;
    email: string;
  };
}
