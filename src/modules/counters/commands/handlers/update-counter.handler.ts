import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { runWithQueryRunner } from 'src/common/utils/runWithQueryRunner';
import { BadRequestException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CounterRepository } from '../../repositories/counter.repository';
import { UpdateCounterCommand } from '../impl/update-counter.command';

@CommandHandler(UpdateCounterCommand)
export class UpdateCounterCommandHandler implements ICommandHandler<UpdateCounterCommand> {
  constructor(
    private readonly _ds: DataSource,
    private readonly _counterRepo: CounterRepository,
  ) {}

  async execute(command: UpdateCounterCommand) {
    return await runWithQueryRunner(this._ds, async (qr) => {
      const { counterId, steps, owner } = command;

      const counter = await this._counterRepo.findOneById(counterId, qr);

      if (!counter || counter.team.owner.id !== owner.id) {
        throw new BadRequestException('Counter not found or not authorized');
      }

      counter.steps = steps;
      await this._counterRepo.update(counter, qr);

      return {
        id: counter.id,
        steps: counter.steps,
        teamId: counter.teamId,
      };
    });
  }
}
