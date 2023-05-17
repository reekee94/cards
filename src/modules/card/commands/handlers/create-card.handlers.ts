import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { runWithQueryRunner } from 'src/common/utils/runWithQueryRunner';
import { DataSource } from 'typeorm';
import { CardRepository } from '../../repositories/card.repository';
import { DefaultCardDto } from '../../dtos/defaultCard.dto';
import { BadRequestException } from '@nestjs/common';
import { CreateCardCommand } from '../impl/create-card.command';
import { CardTypeRepository } from '../../repositories/card_type.repository';

@CommandHandler(CreateCardCommand)
export class CreateCardCommandHandler
  implements ICommandHandler<CreateCardCommand>
{
  constructor(
    private readonly _ds: DataSource,
    private readonly _cardRepo: CardRepository,
    private readonly _cardTypeRepo: CardTypeRepository,
  ) {}
  async execute(command: CreateCardCommand) {
    return await runWithQueryRunner(this._ds, async (qr) => {
      const { name, owner, cardType } = command;

      const candidate = await this._cardRepo.findOneByNameAndOwner(
        name,
        owner.id,
        qr,
      );

      if (candidate) {
        throw new BadRequestException(
          `Card with name: ${name} and ownerId: ${owner.id}, allready exists`,
        );
      }

      const cardTypeEntity = await this._cardTypeRepo.findOneByName(
        cardType,
        qr,
      );

      if (!cardTypeEntity) {
        throw new BadRequestException(`Can't find card type`);
      }

      const card = await this._cardRepo.create(name, owner, cardTypeEntity, qr);

      return DefaultCardDto.fromEntity(card);
    });
  }
}
