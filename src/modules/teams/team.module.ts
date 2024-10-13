import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamController } from './team.controller';
import { TeamRepository } from './repositories/team.repository';
import { CardQueryHandlers } from './queries/handlers';
import { CardCommandHandlers } from './commands/handlers';
import { Team } from './entities/team.entity';
import { CountersModule } from '../counters/counters.module';



@Module({
  imports: [TypeOrmModule.forFeature([Team]), CqrsModule, CountersModule],
  controllers: [TeamController],
  providers: [
    TeamRepository,
    ...CardQueryHandlers,
    ...CardCommandHandlers,
  ],
  exports: [TeamRepository],
})
export class TeamModule {}
