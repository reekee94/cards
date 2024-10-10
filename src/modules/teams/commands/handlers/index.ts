import { CreateTeamCommandHandler } from './create-portfolio.handlers';
import { DeleteTeamCommandHandler } from './delete-portfolio.handlers';
import { UpdateTeamCommandHandler } from './update-team.handlers';

export const CardCommandHandlers = [
  CreateTeamCommandHandler,
  UpdateTeamCommandHandler,
  DeleteTeamCommandHandler,
];
