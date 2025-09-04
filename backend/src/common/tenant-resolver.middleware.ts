import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { tenantAls } from '../prisma/prisma.service';

@Injectable()
export class TenantResolverMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    // Prefer header, fallback to subdomain slug
    const headerTenant = req.header('x-tenant-id') || req.header('x-tenant-slug');
    const host = req.hostname || '';
    const sub = host.split('.')[0];
    const tenantId = headerTenant || sub;

    tenantAls.run({ tenantId }, () => next());
  }
}


