import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { LoggerMiddleware } from 'src/common/log/log.middleware';
import { AuthModule } from './modules/auth/auth.module';
import appConfig from './common/configs/app.config';
import { UserModule } from './modules/user/user.module';
import jwtConfig from './common/configs/jwt.config';
import cookieConfig from './common/configs/cookie.config';
import { ApplicationSeedModule } from './modules/seed/application-seed.module';
import { User } from './modules/user/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, jwtConfig, cookieConfig],
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'rootpassword',
      database: process.env.DB_NAME || 'mydatabase',
      autoLoadModels: true,
      synchronize: true,
      models: [User],
    }),
    AuthModule,
    UserModule,
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
