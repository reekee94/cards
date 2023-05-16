import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { runWithQueryRunner } from 'src/common/utils/runWithQueryRunner';
import { DataSource } from 'typeorm';
import { CardRepository } from '../../repositories/card.repository';
import { DefaultCardDto } from '../../dtos/defaultCard.dto';
import { GetCardByIdQuery } from '../impl/get-card-by-id.query';
import { BadRequestException } from '@nestjs/common';

@QueryHandler(GetCardByIdQuery)
export class GetCardByIdQueryHandler
  implements IQueryHandler<GetCardByIdQuery>
{
  constructor(
    private readonly _ds: DataSource,
    private readonly _cardRepo: CardRepository,
  ) {}
  async execute(query: GetCardByIdQuery): Promise<DefaultCardDto> {
    return await runWithQueryRunner(this._ds, async (qr) => {
      const { cardId } = query;
      const card = await this._cardRepo.findOneById(cardId, qr);

      if (!card) {
        throw new BadRequestException(`Card with id: ${cardId}, not found`);
      }

      return DefaultCardDto.fromEntity(card);
    });
  }
}
