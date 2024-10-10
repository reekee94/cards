import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamController } from './team.controller';
import { TeamRepository } from './repositories/team.repository';
import { CardQueryHandlers } from './queries/handlers';
import { CardCommandHandlers } from './commands/handlers';
import { CounterRepository } from '../counters/repositories/counter.repository';
import { Counter } from '../counters/entities/counter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Counter]), CqrsModule],
  controllers: [TeamController],
  providers: [
    TeamRepository,
    CounterRepository,
    ...CardQueryHandlers,
    ...CardCommandHandlers,
    // CardsSeed,
  ],
  exports: [TeamRepository],
})
export class TeamModule {}
