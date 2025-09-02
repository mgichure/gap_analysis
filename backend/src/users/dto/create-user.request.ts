import { IsEmail, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRequest {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password (must be strong)',
    example: 'StrongPassword123!',
    type: String,
    minLength: 8,
  })
  @IsStrongPassword()
  password: string;
}
