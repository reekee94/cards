import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { runWithQueryRunner } from 'src/common/utils/runWithQueryRunner';
import { DataSource, FindOptionsOrderValue } from 'typeorm';
import { GetFeedQuery } from '../impl/get-feed.query';
import { PortfolioImageRepository } from 'src/modules/portfolio_image/repositories/portfolio_image.repository';

@QueryHandler(GetFeedQuery)
export class GetFeedQueryHandler implements IQueryHandler<GetFeedQuery> {
  constructor(
    private readonly _ds: DataSource,
    private readonly _portfolioImageRepo: PortfolioImageRepository,
  ) {}

  async execute(query: GetFeedQuery) {
    return await runWithQueryRunner(this._ds, async (qr) => {
      const { page, limit, direction } = query;
      const skip = (page - 1) * limit;

      const orderDirection: "ASC" | "DESC" = direction && ['ASC', 'DESC'].includes(direction) ?
      direction as "ASC" | "DESC" : 'DESC';

      const [images, total] = await this._portfolioImageRepo.findAndCount({
        skip,
        take: limit,
        order: { createdAt: { direction: orderDirection } },
        relations: ['portfolio'],
      }, qr);

      const feed = images.map((image) => {
        return {
          image: `data:image/jpeg;base64,${image.data.toString('base64')}`,
          description: image.image_description,
          portfolioName: image.portfolio.name,
        };
      });

      return {
        total,
        page,
        limit,
        data: feed,
      };
    });
  }
}