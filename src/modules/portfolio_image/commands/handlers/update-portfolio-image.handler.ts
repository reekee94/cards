import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { runWithQueryRunner } from 'src/common/utils/runWithQueryRunner';
import { DataSource } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { UpdatePortfolioImageCommand } from '../impl/update-portfolio-image.command';
import { PortfolioImageRepository } from '../../repositories/portfolio_image.repository';
import { PortfolioRepository } from 'src/modules/portfolio/repositories/card.repository';


@CommandHandler(UpdatePortfolioImageCommand)
export class UpdatePortfolioImageCommandHandler implements ICommandHandler<UpdatePortfolioImageCommand> {
  constructor(
    private readonly _ds: DataSource,
    private readonly _portfolioImageRepo: PortfolioImageRepository,
    private readonly _portfolioRepo: PortfolioRepository,
  ) {}

  async execute(command: UpdatePortfolioImageCommand) {
    return await runWithQueryRunner(this._ds, async (qr) => {
      const { imageId, file, name, description, user } = command;

      const image = await this._portfolioImageRepo.findOneById(imageId, qr);

      if (!image) {
        throw new BadRequestException('Image not found');
      }
      const portfolio = await this._portfolioRepo.findOneByImageId(image.id, qr);
      console.log(portfolio)

      if (portfolio?.owner.id !== user.id) {
        throw new BadRequestException('Image not owned by the user');
      }

      if (name) {
        image.image_name = name;
      }

      if (description) {
        image.image_description = description;
      }

      if (file) {
        image.data = file;
      }

      return await this._portfolioImageRepo.update(image, qr);
    });
  }
}
