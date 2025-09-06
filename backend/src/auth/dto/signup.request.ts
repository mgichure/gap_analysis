import { IsEmail, IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TenantType, UserRole } from '@prisma/client';

export class SignupRequest {
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
    description: 'User email address',
    example: 'user@example.com',
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password (any password accepted)',
    example: 'anypassword',
    type: String,
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Organization name',
    example: 'Equity Bank Kenya',
    type: String,
  })
  @IsString()
  organization: string;

  @ApiProperty({
    description: 'Organization type',
    example: 'BANK',
    enum: TenantType,
  })
  @IsEnum(TenantType)
  organizationType: TenantType;

  @ApiProperty({
    description: 'User phone number',
    example: '+1234567890',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string;
}
