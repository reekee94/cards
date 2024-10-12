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
    const { name, description, userId } = command;

    return await runWithQueryRunner(this._ds, async (qr) => {
      const user = await qr.manager.findOne(User, { where: { id: userId } });
      if (!user) {
        throw new BadRequestException(`User with id: ${userId} not found`);
      }

      const team = await this._teamRepo.create(name, description, [user], qr);
      return team;
    });
  }
}
