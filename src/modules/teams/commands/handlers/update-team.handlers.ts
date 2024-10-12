import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { runWithQueryRunner } from 'src/common/utils/runWithQueryRunner';
import { DataSource } from 'typeorm';
import { TeamRepository } from '../../repositories/team.repository';
import { UpdateTeamCommand } from '../impl/update-team.command';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(UpdateTeamCommand)
export class UpdateTeamCommandHandler
  implements ICommandHandler<UpdateTeamCommand> {
  constructor(
    private readonly _ds: DataSource,
    private readonly _teamRepo: TeamRepository,
  ) {}

  async execute(command: UpdateTeamCommand): Promise<void> {
    return await runWithQueryRunner(this._ds, async (qr) => {
      const { id, name, description, userId } = command;
      const team = await this._teamRepo.findOneById(id, qr);

      if (!team) {
        throw new BadRequestException(`Team with id: ${id} not found`);
      }

      if (!team.members.some(user => user.id === userId)) {
        throw new BadRequestException(`Unauthorized action`);
      }

      if (name) team.name = name;
      if (description) team.description = description;

      await this._teamRepo.update(team, qr);
    });
  }
}
