import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioImage } from './entities/portfolio_image.entity';
import { Portfolio } from '../portfolio/entities/portfolio.entity';
import { PortfolioImageController } from './portfolio_image.controller';
import { PortfolioImageRepository } from './repositories/portfolio_image.repository';
import { PortfolioImageCommandHandlers } from './commands/handlers';
import { PortfolioRepository } from '../portfolio/repositories/card.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Portfolio, PortfolioImage]), CqrsModule],
  controllers: [PortfolioImageController],
  providers: [PortfolioImageRepository,
    PortfolioRepository,
    Portfolio,
    // ...CardQueryHandlers,
    ...PortfolioImageCommandHandlers],
  exports: [PortfolioImageRepository],
})
export class ImageModule {}
