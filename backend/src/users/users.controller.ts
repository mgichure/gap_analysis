import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.request';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { User } from '@prisma/client';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBody, 
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse 
} from '@nestjs/swagger';
import { UserResponse } from './dto/user.response';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserRequest })
  @ApiCreatedResponse({ 
    description: 'User created successfully',
    type: UserResponse 
  })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid input data' })
  async createUser(@Body() request: CreateUserRequest) {
    return this.usersService.create(request);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ 
    description: 'List of all users',
    type: [UserResponse] 
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getUsers(@CurrentUser() user: User) {
    return this.usersService.getUsers();
  }
}
