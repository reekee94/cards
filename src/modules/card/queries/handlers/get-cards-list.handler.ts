import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { runWithQueryRunner } from 'src/common/utils/runWithQueryRunner';
import { DataSource } from 'typeorm';
import { GetCardsListQuery } from '../impl/get-cards-list.query';
import { CardRepository } from '../../repositories/card.repository';
import { DefaultCardDto } from '../../dtos/defaultCard.dto';

@QueryHandler(GetCardsListQuery)
export class GetCardsListQueryHandler
  implements IQueryHandler<GetCardsListQuery>
{
  constructor(
    private readonly _ds: DataSource,
    private readonly _cardRepo: CardRepository,
  ) {}
  async execute(query: GetCardsListQuery) {
    return await runWithQueryRunner(this._ds, async (qr) => {
      const cards = await this._cardRepo.findAll(qr);
      const viewCards = cards.map((card) => DefaultCardDto.fromEntity(card));
      return viewCards;
    });
  }
}
