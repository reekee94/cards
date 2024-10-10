import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountersController } from './counters.controller';
import { TeamRepository } from '../teams/repositories/team.repository';
import { Counter } from './entities/counter.entity';
import { CounterCommandHandlers } from './commands/handlers';
import { CounterRepository } from './repositories/counter.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Counter]), CqrsModule],
  controllers: [CountersController],
  providers: [CounterRepository,
    TeamRepository,
    Counter,
    // ...CardQueryHandlers,
    ...CounterCommandHandlers],
  exports: [CounterRepository],
})
export class CountersModule {}
