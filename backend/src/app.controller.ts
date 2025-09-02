import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiOkResponse({ 
    description: 'Application is running',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Hello World!' }
      }
    }
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
