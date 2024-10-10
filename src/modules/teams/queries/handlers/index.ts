import { GetTeamByIdQueryHandler } from './get-team-by-id.handler';
import { GetTeamsListQueryHandler } from './get-team-list.handler';

export const CardQueryHandlers = [
  GetTeamsListQueryHandler,
  GetTeamByIdQueryHandler,
];
