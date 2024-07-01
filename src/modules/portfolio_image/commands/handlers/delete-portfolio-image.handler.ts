import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { runWithQueryRunner } from 'src/common/utils/runWithQueryRunner';
import { DataSource } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { DeletePortfolioImageCommand } from '../impl/delete-portfolio-image.command';
import { PortfolioImageRepository } from '../../repositories/portfolio_image.repository';

@CommandHandler(DeletePortfolioImageCommand)
export class DeletePortfolioImageCommandHandler implements ICommandHandler<DeletePortfolioImageCommand> {
  constructor(
    private readonly _ds: DataSource,
    private readonly _portfolioImageRepo: PortfolioImageRepository,
  ) {}

  async execute(command: DeletePortfolioImageCommand) {
    return await runWithQueryRunner(this._ds, async (qr) => {
      const { imageId, user } = command;

      const image = await this._portfolioImageRepo.findOneById(imageId, qr);

      if (!image || image.portfolio.owner.id !== user.id) {
        throw new BadRequestException('Image not found or not owned by the user');
      }

      await this._portfolioImageRepo.delete(image, qr);
    });
  }
}
