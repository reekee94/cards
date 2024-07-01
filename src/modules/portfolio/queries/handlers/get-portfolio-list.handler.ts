import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { runWithQueryRunner } from 'src/common/utils/runWithQueryRunner';
import { DataSource } from 'typeorm';
import { GetPortfoliosListQuery } from '../impl/get-portfolio-list.query';
import { PortfolioRepository } from '../../repositories/card.repository';
import { DefaultPortfolioDto } from '../../dtos/default-portfolio.dto';

@QueryHandler(GetPortfoliosListQuery)
export class GetCardsListQueryHandler
  implements IQueryHandler<GetPortfoliosListQuery>
{
  constructor(
    private readonly _ds: DataSource,
    private readonly _cardRepo: PortfolioRepository,
  ) {}
  async execute(query: GetPortfoliosListQuery) {
    return await runWithQueryRunner(this._ds, async (qr) => {
      const cards = await this._cardRepo.findAll(qr);
      console.log('1111111', cards)
      const viewCards = cards.map((card) => DefaultPortfolioDto.fromEntity(card));
      return viewCards;
    });
  }
}
