import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { runWithQueryRunner } from 'src/common/utils/runWithQueryRunner';
import { DataSource } from 'typeorm';
import { TeamRepository } from '../../repositories/team.repository';
import { DeleteTeamCommand } from '../impl/delete-team.command';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(DeleteTeamCommand)
export class DeleteTeamCommandHandler
  implements ICommandHandler<DeleteTeamCommand> {
  constructor(
    private readonly _ds: DataSource,
    private readonly _teamRepo: TeamRepository,
  ) {}

  async execute(command: DeleteTeamCommand): Promise<void> {
    return await runWithQueryRunner(this._ds, async (qr) => {
      const { id, ownerId } = command;
      const team = await this._teamRepo.findOneById(id, qr);

      if (!team) {
        throw new BadRequestException(`Team with id: ${id} not found`);
      }

      if (team.owner.id !== ownerId) {
        throw new BadRequestException(`Unauthorized action`);
      }

      await this._teamRepo.delete(team, qr);
    });
  }
}
