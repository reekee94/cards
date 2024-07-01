import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioController } from './portfolio.controller';
import { PortfolioRepository } from './repositories/card.repository';
import { CardQueryHandlers } from './queries/handlers';
import { Portfolio } from './entities/portfolio.entity';
// import { CardsSeed } from './seeds/card-type.seed';
import { PortfolioImage } from '../portfolio_image/entities/portfolio_image.entity';
import { CardCommandHandlers } from './commands/handlers';
import { PortfolioImageRepository } from '../portfolio_image/repositories/portfolio_image.repository';
import { FeedController } from './feed.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Portfolio, PortfolioImage]), CqrsModule],
  controllers: [PortfolioController, FeedController],
  providers: [
    PortfolioRepository,
    PortfolioImageRepository,
    ...CardQueryHandlers,
    ...CardCommandHandlers,
    // CardsSeed,
  ],
  exports: [PortfolioRepository],
})
export class PortfolioModule {}
