import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User as UserEntity } from './user.entity';
import { UserQueryHandlers } from './queries/handlers';
// import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserCommandHandlers } from './commands/handlers';
import { TokenModule } from '../token/token.module';
import { UserSubscriber } from './user.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CqrsModule, TokenModule],
  // controllers: [UserController],
  controllers: [],
  providers: [
    UserRepository,
    ...UserQueryHandlers,
    ...UserCommandHandlers,
    UserSubscriber,
  ],
})
export class UserModule {}
