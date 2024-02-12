import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as https from 'https';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
    httpsOptions: {
      key: fs.readFileSync('./cert/server.key'),
      cert: fs.readFileSync('./cert/server.cert'),
    },
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
