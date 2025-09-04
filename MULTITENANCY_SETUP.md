# Multitenancy Setup Guide

This guide explains how to set up and test the multitenancy system in your gap analysis tool.

## Backend Setup

### 1. Database Migration
First, run the Prisma migration to create the new tenant tables:

```bash
cd backend
npx prisma migrate dev --name add_multitenancy
```

### 2. Seed the Database
Populate the database with sample data:

```bash
npm run db:seed
```

This will create:
- 3 sample tenants (ACME Corp, Tech Startup, Global Enterprise)
- 6 sample users (2 per tenant)
- Sample ISO clauses, risks, actions, and evidence for ACME Corp

### 3. Start the Backend
```bash
npm run start:dev
```

## Frontend Testing

### 1. Start the Frontend
```bash
cd frontend
npm run dev
```

### 2. Test Tenant Switching
1. Open the application in your browser
2. Look for the tenant switcher button in the top navigation (shows current tenant name)
3. Click the tenant switcher to see available tenants
4. Select a different tenant to switch contexts
5. The page will reload and show data for the selected tenant

### 3. Manual Tenant Testing
You can also manually set the tenant in browser console:

```javascript
// Set tenant to ACME Corp
localStorage.setItem('tenantId', 'acme-corp');

// Set tenant to Tech Startup
localStorage.setItem('tenantId', 'tech-startup');

// Set tenant to Global Enterprise
localStorage.setItem('tenantId', 'global-enterprise');

// Refresh the page to see changes
window.location.reload();
```

## Sample Data

### Tenants
- **ACME Corporation** (`acme-corp`) - Has full sample data
- **Tech Startup Inc** (`tech-startup`) - Has users only
- **Global Enterprise Ltd** (`global-enterprise`) - Has users only

### Test Users
- **ACME Corp**: `john.doe@acme-corp.com` / `password123`
- **Tech Startup**: `alex@tech-startup.com` / `password123`
- **Global Enterprise**: `mike@global-enterprise.com` / `password123`

## How It Works

### Backend
1. **Middleware**: `TenantResolverMiddleware` extracts tenant ID from `X-Tenant-Id` header or subdomain
2. **ALS**: Uses AsyncLocalStorage to store tenant context per request
3. **Prisma Scoping**: Automatically adds `tenantId` filter to all queries and mutations for tenant-aware models

### Frontend
1. **API Helper**: Automatically sends `X-Tenant-Id` header with all API requests
2. **Tenant Switcher**: Allows users to switch between tenants
3. **Local Storage**: Persists tenant selection across browser sessions

## Testing Scenarios

### 1. Data Isolation
- Switch between tenants and verify data is isolated
- Create new data in one tenant and verify it doesn't appear in others

### 2. API Calls
- Check browser network tab to see `X-Tenant-Id` headers
- Verify backend logs show tenant context for each request

### 3. User Management
- Test that users can only see data from their assigned tenant
- Verify that user creation respects tenant boundaries

## Troubleshooting

### Common Issues

1. **No data showing**: Check that `localStorage.tenantId` is set correctly
2. **Backend errors**: Ensure the database is seeded and migrations are applied
3. **Tenant not switching**: Clear browser cache and localStorage, then retry

### Debug Mode
Enable debug logging in the backend by checking the console for tenant resolution messages.

## Next Steps

Once basic multitenancy is working:

1. **Extend Models**: Add `tenantId` to other models (Evidence, Actions, Risks, etc.)
2. **User Roles**: Implement tenant-specific user roles and permissions
3. **Tenant Management**: Add admin interface for managing tenants
4. **Data Migration**: Create tools for migrating existing data to tenant structure
