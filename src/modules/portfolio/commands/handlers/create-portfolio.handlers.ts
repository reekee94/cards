import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { runWithQueryRunner } from 'src/common/utils/runWithQueryRunner';
import { DataSource } from 'typeorm';
import { PortfolioRepository } from '../../repositories/card.repository';
import { DefaultPortfolioDto } from '../../dtos/default-portfolio.dto';
import { BadRequestException } from '@nestjs/common';
import { CreatePortfolioCommand } from '../impl/create-portfolio.command';

@CommandHandler(CreatePortfolioCommand)
export class CreatePortfolioCommandHandler
  implements ICommandHandler<CreatePortfolioCommand>
{
  constructor(
    private readonly _ds: DataSource,
    private readonly _portfolioRepo: PortfolioRepository,
  ) {}

  async execute(command: CreatePortfolioCommand) {
    return await runWithQueryRunner(this._ds, async (qr) => {
      const { name, description, owner, portfolioImage } = command;

      const portfolio = await this._portfolioRepo.create(name, description, owner, portfolioImage, qr);

      return DefaultPortfolioDto.fromEntity(portfolio);
    });
  }
}