import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CookieModule } from '../cookie/cookie.module';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [CqrsModule, CookieModule, UserModule],
  controllers: [AuthController],
})
export class AuthModule {}
