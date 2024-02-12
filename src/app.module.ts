import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import dbConfig from './db/dbConfig';
//common
import { LoggerMiddleware } from './common/logger.middleware';
// controllers
import { AppController } from './app.controller';
import { UserController } from './controllers/user.controller';
//services / providers
import { AppService } from './app.service';
import { UserService } from './services/user/user.service';

//Shared

@Module({
  imports: [
    SequelizeModule.forRoot(dbConfig.sequelizeConfig),
    SequelizeModule.forFeature(dbConfig.models),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
