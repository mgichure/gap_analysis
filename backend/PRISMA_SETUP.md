# PostgreSQL & Prisma Setup Guide

## Prerequisites
- PostgreSQL installed and running
- Node.js and npm

## Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file in the backend directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/gap_analysis?schema=public"

# JWT Configuration
JWT_ACCESS_TOKEN_SECRET=your_access_token_secret_here
JWT_REFRESH_TOKEN_SECRET=your_refresh_token_secret_here
JWT_ACCESS_TOKEN_EXPIRATION_MS=900000
JWT_REFRESH_TOKEN_EXPIRATION_MS=604800000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# App Configuration
NODE_ENV=development
AUTH_UI_REDIRECT=http://localhost:3000
```

### 3. Database Setup
1. Create a PostgreSQL database named `gap_analysis`
2. Update the `DATABASE_URL` in your `.env` file with your database credentials

### 4. Generate Prisma Client
```bash
npx prisma generate
```

### 5. Run Database Migrations
```bash
npx prisma migrate dev --name init
```

### 6. Start the Application
```bash
npm run start:dev
```

### 7. Access API Documentation
Once the application is running, you can access the Swagger API documentation at:
```
http://localhost:3000/api
```

## Database Schema
The application now uses PostgreSQL with the following schema:

- **User**: Contains user information with email, password, and refresh token
- **Timestamps**: Automatic `createdAt` and `updatedAt` fields

## Migration from MongoDB
The following changes were made to migrate from MongoDB to PostgreSQL:

1. **Removed MongoDB dependencies**: `@nestjs/mongoose` and `mongoose`
2. **Added Prisma**: `prisma` and `@prisma/client`
3. **Updated User model**: Changed from Mongoose schema to Prisma model
4. **Updated services**: Modified `UsersService` and `AuthService` to use Prisma
5. **Updated modules**: Replaced `MongooseModule` with `PrismaModule`

## API Documentation with Swagger
The application includes comprehensive API documentation using Swagger:

### Features:
- **Interactive Documentation**: Test API endpoints directly from the browser
- **Authentication Support**: JWT Bearer token and cookie authentication
- **Request/Response Examples**: Detailed examples for all endpoints
- **Error Documentation**: Comprehensive error response documentation
- **Endpoint Grouping**: Organized by tags (health, auth, users)

### Available Endpoints:
- **Health Check**: `GET /` - Verify API status
- **User Management**: 
  - `POST /users` - Create new user
  - `GET /users` - Get all users (authenticated)
- **Authentication**:
  - `POST /auth/login` - User login
  - `POST /auth/refresh` - Refresh access token
  - `GET /auth/google` - Google OAuth login
  - `GET /auth/google/callback` - Google OAuth callback

## Useful Prisma Commands
- `npx prisma studio` - Open Prisma Studio to view/edit data
- `npx prisma migrate dev` - Create and apply new migrations
- `npx prisma migrate reset` - Reset database and apply all migrations
- `npx prisma generate` - Generate Prisma client after schema changes

## Useful Swagger Commands
- Access documentation: `http://localhost:3000/api`
- Export OpenAPI spec: Available in Swagger UI
- Test endpoints: Use the "Try it out" feature in Swagger UI
