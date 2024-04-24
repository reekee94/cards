import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { runWithQueryRunner } from 'src/common/utils/runWithQueryRunner';
import { DataSource } from 'typeorm';
import { CardRepository } from '../../repositories/card.repository';
import { DefaultCardDto } from '../../dtos/defaultCard.dto';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { UpdateCardCommand } from '../impl/update-card.command';
import { CardTypeRepository } from '../../repositories/card_type.repository';

@CommandHandler(UpdateCardCommand)
export class UpdateCardCommandHandler
  implements ICommandHandler<UpdateCardCommand>
{
  constructor(
    private readonly _ds: DataSource,
    private readonly _cardRepo: CardRepository,
    private readonly _cardTypeRepo: CardTypeRepository,
  ) {}
  async execute(command: UpdateCardCommand) {
    return await runWithQueryRunner(this._ds, async (qr) => {
      const { cardId, name, ownerId, cardType } = command;

      const candidate = await this._cardRepo.findOneById(cardId, qr);

      if (!candidate) {
        throw new BadRequestException(`Card not found with id: ${cardId}.`);
      }

      if (candidate.owner.id !== ownerId) {
        throw new ForbiddenException('Card not owned');
      }

      if (cardType !== candidate.cardImages.name) {
        const newCardType = await this._cardTypeRepo.findOneByName(
          cardType,
          qr,
        );

        if (!newCardType) {
          throw new BadRequestException(
            `CardType not found with name: ${cardType}.`,
          );
        }
        candidate.cardImages = newCardType;
      }

      candidate.image = name;
      const updatedCard = await this._cardRepo.update(candidate, qr);

      return DefaultCardDto.fromEntity(updatedCard);
    });
  }
}
