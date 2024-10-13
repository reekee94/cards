import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamRepository } from '../teams/repositories/team.repository';
import { CounterService } from './service/counter.service';
import { CounterController } from './controllers/v1/counters.controller';
import { UserRepository } from '../user/user.repository';
import { Team } from '../teams/entities/team.entity';
import { User } from '../user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Team]),
  ],
  controllers: [CounterController],
  providers: [CounterService, TeamRepository, UserRepository],
  exports: [CounterService]
})
export class CountersModule {}
