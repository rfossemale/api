import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { APIError } from './shared/BaseError';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }

  @Get('/error')
  async errorTesting(): Promise<any> {
    throw new Error('Error como parameter');
  }

  @Get('/error2')
  async errorTestingTwo(): Promise<any> {
    throw new APIError(
      'THIS IS INTENTIONAL ERROR',
      400,
      true,
      'error generated in the endpoint /error2',
    );
  }
}
