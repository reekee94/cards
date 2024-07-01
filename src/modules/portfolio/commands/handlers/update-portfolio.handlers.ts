import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { runWithQueryRunner } from 'src/common/utils/runWithQueryRunner';
import { DataSource } from 'typeorm';
import { PortfolioRepository } from '../../repositories/card.repository';
import { DefaultPortfolioDto } from '../../dtos/default-portfolio.dto';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { UpdatePortfolioCommand } from '../impl/update-portfolio.command';

@CommandHandler(UpdatePortfolioCommand)
export class UpdatePortfolioCommandHandler implements ICommandHandler<UpdatePortfolioCommand> {
  constructor(
    private readonly _ds: DataSource,
    private readonly _cardRepo: PortfolioRepository,
  ) {}

  async execute(command: UpdatePortfolioCommand) {
    return await runWithQueryRunner(this._ds, async (qr) => {
      const { id, name, ownerId, description } = command;

      const profile = await this._cardRepo.findOneById(id, qr);

      if (!profile || profile.owner.id !== ownerId) {
        throw new NotFoundException(`Card with id: ${id} not found or not owned by user with id: ${ownerId}`);
      }

      profile.name = name;
      profile.description = description;

      await this._cardRepo.update(profile, qr);
    });
  }
}
