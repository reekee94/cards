import { CreateTeamCommandHandler } from './create-team.handlers';
import { DeleteTeamCommandHandler } from './delete-team.handlers';
import { UpdateTeamCommandHandler } from './update-team.handlers';

export const CardCommandHandlers = [
  CreateTeamCommandHandler,
  UpdateTeamCommandHandler,
  DeleteTeamCommandHandler,
];
