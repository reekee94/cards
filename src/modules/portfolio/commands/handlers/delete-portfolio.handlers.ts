import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { runWithQueryRunner } from 'src/common/utils/runWithQueryRunner';
import { DataSource } from 'typeorm';
import { PortfolioRepository } from '../../repositories/card.repository';
import { NotFoundException } from '@nestjs/common';
import { DeletePortfolioCommand } from '../impl/delete-portfolio.command';

@CommandHandler(DeletePortfolioCommand)
export class DeletePortfolioCommandHandler implements ICommandHandler<DeletePortfolioCommand> {
  constructor(
    private readonly _ds: DataSource,
    private readonly _cardRepo: PortfolioRepository,
  ) {}

  async execute(command: DeletePortfolioCommand) {
    return await runWithQueryRunner(this._ds, async (qr) => {
      const { id, ownerId } = command;

      const card = await this._cardRepo.findOneById(id, qr);

      if (!card || card.owner.id !== ownerId) {
        throw new NotFoundException(`Card with id: ${id} not found or not owned by user with id: ${ownerId}`);
      }

      await this._cardRepo.delete(card, qr);
    });
  }
}
