import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { runWithQueryRunner } from 'src/common/utils/runWithQueryRunner';
import { DataSource } from 'typeorm';
import { CardRepository } from '../../repositories/card.repository';
import { DefaultCardDto } from '../../dtos/defaultCard.dto';
import { BadRequestException } from '@nestjs/common';
import { CreateCardCommand } from '../impl/create-card.command';

@QueryHandler(CreateCardCommand)
export class CreateCardCommandHandler
  implements IQueryHandler<CreateCardCommand>
{
  constructor(
    private readonly _ds: DataSource,
    private readonly _cardRepo: CardRepository,
  ) {}
  async execute(command: CreateCardCommand) {
    return await runWithQueryRunner(this._ds, async (qr) => {
      const { name, ownerId, cardType } = command;

      const candidate = await this._cardRepo.findOneByNameAndOwner(
        name,
        ownerId,
        qr,
      );

      if (candidate) {
        throw new BadRequestException(
          `Card with name: ${name} and ownerId: ${ownerId}, allready exists`,
        );
      }
      const card = await this._cardRepo.create(name, ownerId, cardType, qr);

      return DefaultCardDto.fromEntity(card);
    });
  }
}
