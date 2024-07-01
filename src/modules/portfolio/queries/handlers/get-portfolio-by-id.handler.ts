import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { runWithQueryRunner } from 'src/common/utils/runWithQueryRunner';
import { DataSource } from 'typeorm';
import { PortfolioRepository } from '../../repositories/card.repository';
import { DefaultPortfolioDto } from '../../dtos/default-portfolio.dto';
import { GetPortfolioByIdQuery } from '../impl/get-portfolio-by-id.query';
import { BadRequestException } from '@nestjs/common';

@QueryHandler(GetPortfolioByIdQuery)
export class GetCardByIdQueryHandler
  implements IQueryHandler<GetPortfolioByIdQuery>
{
  constructor(
    private readonly _ds: DataSource,
    private readonly _cardRepo: PortfolioRepository,
  ) {}
  async execute(query: GetPortfolioByIdQuery): Promise<DefaultPortfolioDto> {
    return await runWithQueryRunner(this._ds, async (qr) => {
      const { id } = query;
      const card = await this._cardRepo.findOneById(id, qr);

      if (!card) {
        throw new BadRequestException(`Card with id: ${id}, not found`);
      }

      return DefaultPortfolioDto.fromEntity(card);
    });
  }
}
