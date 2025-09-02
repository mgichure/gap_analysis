import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserRequest } from './dto/create-user.request';
import { hash } from 'bcryptjs';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserRequest): Promise<User> {
    return this.prisma.user.create({
      data: {
        ...data,
        password: await hash(data.password, 10),
      },
    });
  }

  async getUser(query: Partial<User>): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: query,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async updateUser(query: Partial<User>, data: Partial<User>): Promise<User> {
    const where = Object.keys(query).reduce((acc, key) => {
      acc[key] = query[key];
      return acc;
    }, {} as any);

    return this.prisma.user.update({
      where,
      data,
    });
  }

  async getOrCreateUser(data: CreateUserRequest): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (user) {
      return user;
    }
    return this.create(data);
  }
}
