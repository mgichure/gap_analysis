import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  
  // Enable CORS for frontend
  app.enableCors({
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:3000',
      'http://localhost:3000',
      'http://localhost:3001'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Tenant-Id'],
  });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Gap Analysis API')
    .setDescription(`
      # Gap Analysis API Documentation
      
      This API provides endpoints for user management and authentication.
      
      ## Authentication
      The API uses JWT tokens for authentication. Include the token in the Authorization header:
      \`Authorization: Bearer <your-token>\`
      
      ## Endpoints
      - **Health Check**: Verify API status
      - **Users**: User management operations
      - **Auth**: Authentication and authorization
    `)
    .setVersion('1.0')
    .addTag('health', 'Health check endpoints')
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User management endpoints')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addCookieAuth('Authentication', {
      type: 'apiKey',
      in: 'cookie',
      name: 'Authentication',
      description: 'JWT access token cookie',
    })
    .addCookieAuth('Refresh', {
      type: 'apiKey',
      in: 'cookie',
      name: 'Refresh',
      description: 'JWT refresh token cookie',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Gap Analysis API Documentation',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
