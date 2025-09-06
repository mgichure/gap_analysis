import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserRequest } from './dto/create-user.request';
import { hash } from 'bcryptjs';
import { User, Prisma } from '@prisma/client';

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
    console.log('🔍 UsersService.getUser called with query:', query);
    
    // Convert the query to use proper Prisma types
    const whereClause: Prisma.UserWhereInput = {};
    
    // Handle array fields properly
    if (query.complianceCertifications) {
      whereClause.complianceCertifications = {
        has: query.complianceCertifications[0] // Use first element for has filter
      };
    }
    
    // Handle other fields
    Object.keys(query).forEach(key => {
      if (key !== 'complianceCertifications' && key !== 'auditFindings' && key !== 'trainingHistory' && key !== 'tags') {
        (whereClause as any)[key] = (query as any)[key];
      }
    });

    // Add tenant filtering if tenant context is available AND we're not looking up by email (for authentication)
    // During login, we need to find the user by email without tenant filtering
    const tenantId = this.prisma.getCurrentTenantId();
    console.log('🏢 Current tenant ID:', tenantId);
    console.log('📧 Query has email:', !!query.email);
    
    if (tenantId && !query.email) {
      whereClause.tenantId = tenantId;
      console.log('🔒 Adding tenant filter:', tenantId);
    } else {
      console.log('🔓 No tenant filter applied');
    }

    console.log('🔍 Final where clause:', JSON.stringify(whereClause, null, 2));

    const user = await this.prisma.user.findFirst({
      where: whereClause,
    });
    
    console.log('👤 User found:', user ? 'Yes' : 'No');
    if (user) {
      console.log('👤 User email:', user.email);
    }
    
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getUsers(): Promise<User[]> {
    // Add tenant filtering if tenant context is available
    const tenantId = this.prisma.getCurrentTenantId();
    const whereClause: Prisma.UserWhereInput = {};
    
    if (tenantId) {
      whereClause.tenantId = tenantId;
    }
    
    return this.prisma.user.findMany({
      where: whereClause,
    });
  }

  async updateUser(query: Partial<User>, data: Partial<User>): Promise<User> {
    // Convert the query to use proper Prisma types
    let whereClause: Prisma.UserWhereUniqueInput;
    
    if (query.id) {
      whereClause = { id: query.id };
    } else if (query.email && query.tenantId) {
      whereClause = {
        tenantId_email: {
          tenantId: query.tenantId,
          email: query.email
        }
      };
    } else if (query.employeeId && query.tenantId) {
      whereClause = {
        tenantId_employeeId: {
          tenantId: query.tenantId,
          employeeId: query.employeeId
        }
      };
    } else {
      throw new Error('Invalid query: must provide id, or email+tenantId, or employeeId+tenantId');
    }

    // Remove tenantId from data as it's managed by the middleware
    const { tenantId, ...updateData } = data;

    return this.prisma.user.update({
      where: whereClause,
      data: updateData as Prisma.UserUpdateInput,
    });
  }

  async getOrCreateUser(data: CreateUserRequest): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { 
        tenantId_email: {
          tenantId: data.tenantId,
          email: data.email
        }
      },
    });
    if (user) {
      return user;
    }
    return this.create(data);
  }
}
