import { IsEmail, IsStrongPassword, IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';

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

  @ApiProperty({
    description: 'User first name',
    example: 'John',
    type: String,
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
    type: String,
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'User role',
    example: 'USER',
    enum: UserRole,
  })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({
    description: 'Tenant ID',
    example: 'tenant-123',
    type: String,
  })
  @IsString()
  tenantId: string;

  @ApiProperty({
    description: 'User phone number',
    example: '+1234567890',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    description: 'User department',
    example: 'IT',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  department?: string;
}
