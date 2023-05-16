import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { TokenCommandHandlers } from './commands/handlers';
import { Token as TokenEntity } from './token.entity';
import { TokenRepository } from './token.repository';
import { TokenService } from './token.service';

@Global()
@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([TokenEntity]),
    // UserModule,
  ],
  providers: [TokenService, TokenRepository, ...TokenCommandHandlers],
  exports: [TokenService, TokenRepository],
})
export class TokenModule {}
