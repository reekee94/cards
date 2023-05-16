import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { runWithQueryRunner } from 'src/common/utils/runWithQueryRunner';
import { DataSource } from 'typeorm';
import { CardRepository } from '../../repositories/card.repository';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { DeleteCardCommand } from '../impl/delete-card.command copy';

@QueryHandler(DeleteCardCommand)
export class DeleteCardCommandHandler
  implements IQueryHandler<DeleteCardCommand>
{
  constructor(
    private readonly _ds: DataSource,
    private readonly _cardRepo: CardRepository,
  ) {}
  async execute(command: DeleteCardCommand) {
    return await runWithQueryRunner(this._ds, async (qr) => {
      const { cardId, ownerId } = command;

      const candidate = await this._cardRepo.findOneById(cardId, qr);

      if (!candidate) {
        throw new BadRequestException(`Card not found with id: ${cardId}.`);
      }

      if (candidate.owner.id !== ownerId) {
        throw new ForbiddenException('Card not owned');
      }

      await this._cardRepo.delete(candidate, qr);
    });
  }
}
