import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { runWithQueryRunner } from 'src/common/utils/runWithQueryRunner';
import { BadRequestException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TeamRepository } from 'src/modules/teams/repositories/team.repository';
import { CounterRepository } from '../../repositories/counter.repository';
import { CreateCounterCommand } from '../impl/create-counter.command';

@CommandHandler(CreateCounterCommand)
export class CreateCounterCommandHandler implements ICommandHandler<CreateCounterCommand> {
  constructor(
    private readonly _ds: DataSource,
    private readonly _teamRepo: TeamRepository,
    private readonly _counterRepo: CounterRepository,
  ) {}

  async execute(command: CreateCounterCommand) {
    return await runWithQueryRunner(this._ds, async (qr) => {
      const { teamId, steps, owner } = command;

      const team = await this._teamRepo.findOneById(teamId, qr);

      if (!team || team.owner.id !== owner.id) {
        throw new BadRequestException('Team not found or not owned by the user');
      }

      const newCounter = await this._counterRepo.create(teamId, steps, qr);

      return {
        id: newCounter.id,
        steps: newCounter.steps,
        teamId,
      };
    });
  }
}
