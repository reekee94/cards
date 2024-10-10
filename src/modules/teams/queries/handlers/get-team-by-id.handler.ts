import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { runWithQueryRunner } from 'src/common/utils/runWithQueryRunner';
import { DataSource } from 'typeorm';
import { TeamRepository } from '../../repositories/team.repository';
import { GetTeamByIdQuery } from '../impl/get-team-by-id.query';
import { BadRequestException } from '@nestjs/common';
import { DefaultTeamDto } from '../../dtos/default-team.dto';

@QueryHandler(GetTeamByIdQuery)
export class GetTeamByIdQueryHandler
  implements IQueryHandler<GetTeamByIdQuery> {
  constructor(
    private readonly _ds: DataSource,
    private readonly _teamRepo: TeamRepository,
  ) {}

  async execute(query: GetTeamByIdQuery): Promise<DefaultTeamDto> {
    return await runWithQueryRunner(this._ds, async (qr) => {
      const { id } = query;
      const team = await this._teamRepo.findOneById(id, qr);

      if (!team) {
        throw new BadRequestException(`Team with id: ${id} not found`);
      }

      return DefaultTeamDto.fromEntity(team);
    });
  }
}