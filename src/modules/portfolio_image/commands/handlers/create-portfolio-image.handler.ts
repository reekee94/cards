import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { runWithQueryRunner } from 'src/common/utils/runWithQueryRunner';


import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { CreatePortfolioImageCommand } from '../impl/create-portfolio-image.command';
import { DataSource } from 'typeorm';
import { PortfolioRepository } from 'src/modules/portfolio/repositories/card.repository';
import { PortfolioImageRepository } from '../../repositories/portfolio_image.repository';


@CommandHandler(CreatePortfolioImageCommand)
export class CreatePortfolioImageCommandHandler implements ICommandHandler<CreatePortfolioImageCommand> {
  constructor(
    private readonly _ds: DataSource,
    private readonly _portfolioRepo: PortfolioRepository,
    private readonly _portfolioImageRepo: PortfolioImageRepository,
  ) {}

  async execute(command: CreatePortfolioImageCommand) {
    return await runWithQueryRunner(this._ds, async (qr) => {
      const { portfolioId, file, imageName, imageDescription, user } = command;

      const portfolio = await this._portfolioRepo.findOneById(portfolioId, qr);

      if (!portfolio || portfolio.owner.id !== user.id) {
        throw new BadRequestException('Portfolio not found or not owned by the user');
      }
    
      if(portfolio.imageId) {
        throw new ForbiddenException('Portfolio already has an image');
      }

      const newImage = await this._portfolioImageRepo.create(file, imageName, imageDescription, portfolioId, qr);

      portfolio.image = newImage;
      await this._portfolioRepo.update(portfolio, qr);

    return {
        id: newImage.id,
        name: newImage.image_name,
        description: newImage.image_description,
        data: `data:image/jpeg;base64,${newImage.data.toString('base64')}`,
        portfolioId,
      };
    });
  }
  
}