import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { runWithQueryRunner } from 'src/common/utils/runWithQueryRunner';
import { BadRequestException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CounterRepository } from '../../repositories/counter.repository';
import { DeleteCounterCommand } from '../impl/delete-counter.command';

@CommandHandler(DeleteCounterCommand)
export class DeleteCounterCommandHandler implements ICommandHandler<DeleteCounterCommand> {
  constructor(
    private readonly _ds: DataSource,
    private readonly _counterRepo: CounterRepository,
  ) {}

  async execute(command: DeleteCounterCommand) {
    return await runWithQueryRunner(this._ds, async (qr) => {
      const { counterId, owner } = command;

      const counter = await this._counterRepo.findOneById(counterId, qr);

      if (!counter || counter.team.owner.id !== owner.id) {
        throw new BadRequestException('Counter not found or not authorized');
      }

      await this._counterRepo.delete(counter, qr);

      return {
        message: 'Counter successfully deleted',
      };
    });
  }
}
