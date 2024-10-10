import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { runWithQueryRunner } from 'src/common/utils/runWithQueryRunner';
import { DataSource } from 'typeorm';
import { TeamRepository } from '../../repositories/team.repository';
import { DefaultTeamDto } from '../../dtos/default-team.dto';
import { GetTeamsListQuery } from '../impl/get-team-list.query';

@QueryHandler(GetTeamsListQuery)
export class GetTeamsListQueryHandler
  implements IQueryHandler<GetTeamsListQuery> {
  
  constructor(
    private readonly _ds: DataSource,
    private readonly _teamRepo: TeamRepository,  // Using teamRepo instead of cardRepo
  ) {}

  async execute(query: GetTeamsListQuery) {
    return await runWithQueryRunner(this._ds, async (qr) => {
      const teams = await this._teamRepo.findAll(qr);  // Fetch all teams
      const viewTeams = teams.map((team) => DefaultTeamDto.fromEntity(team));  // Convert to DTOs
      return viewTeams;
    });
  }
}
