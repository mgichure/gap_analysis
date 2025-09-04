import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AsyncLocalStorage } from 'node:async_hooks';

export const tenantAls = new AsyncLocalStorage<{ tenantId?: string }>();

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  async onModuleInit() {
    await this.$connect();

    (this as any).$use(async (params: any, next: any) => {
      const store = tenantAls.getStore();
      const tenantId = store?.tenantId;
      if (!tenantId) return next(params);

      const read = ['findFirst', 'findMany', 'count', 'aggregate', 'findUnique'];
      const create = ['create', 'createMany', 'upsert'];
      const mutate = ['update', 'updateMany', 'delete', 'deleteMany'];

      // Only scope models that have tenantId; for others, skip
      const modelsWithTenant = new Set([
        'User', 
        'Branch', 
        'Department', 
        'ComplianceFramework', 
        'Risk', 
        'Action', 
        'Evidence', 
        'Assessment', 
        'AuditLog', 
        'ComplianceReport'
      ]);
      if (!modelsWithTenant.has(params.model || '')) {
        return next(params);
      }

      if (read.includes(params.action)) {
        params.args = params.args || {};
        params.args.where = { ...(params.args?.where || {}), tenantId };
      }

      if (create.includes(params.action)) {
        params.args = params.args || {};
        params.args.data = { ...(params.args?.data || {}), tenantId };
      }

      if (mutate.includes(params.action)) {
        params.args = params.args || {};
        params.args.where = { ...(params.args?.where || {}), tenantId };
      }

      return next(params);
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
