import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { runWithQueryRunner } from 'src/common/utils/runWithQueryRunner';
import { DataSource } from 'typeorm';
import { TeamRepository } from '../../repositories/team.repository';
import { BadRequestException } from '@nestjs/common';
import { User } from 'src/modules/user/user.entity';
import { CreateTeamCommand } from '../impl/create-portfolio.command';

@CommandHandler(CreateTeamCommand)
export class CreateTeamCommandHandler
  implements ICommandHandler<CreateTeamCommand> {
  constructor(
    private readonly _ds: DataSource,
    private readonly _teamRepo: TeamRepository,
  ) {}

  async execute(command: CreateTeamCommand): Promise<any> {
    const { name, description, ownerId } = command;

    return await runWithQueryRunner(this._ds, async (qr) => {
      const owner = await qr.manager.findOne(User, { where: { id: ownerId } });
      if (!owner) {
        throw new BadRequestException(`Owner with id: ${ownerId} not found`);
      }

      const team = await this._teamRepo.create(name, description, owner, undefined, qr);
      return team;
    });
  }
}
