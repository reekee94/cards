import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from 'src/common/log/log.middleware';
import { AuthModule } from './modules/auth/auth.module';
import appConfig from './common/configs/app.config';
import { UserModule } from './modules/user/user.module';
import { typeOrmConfig } from './common/database/database.migrations';
import jwtConfig from './common/configs/jwt.config';
import cookieConfig from './common/configs/cookie.config';
import { ApplicationSeedModule } from './modules/seed/application-seed.module';
import { CardModule } from './modules/card/card.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, jwtConfig, cookieConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UserModule,
    CardModule,
    ApplicationSeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
