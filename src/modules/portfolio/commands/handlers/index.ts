import { CreatePortfolioCommandHandler } from './create-portfolio.handlers';
import { DeletePortfolioCommandHandler } from './delete-portfolio.handlers';
import { UpdatePortfolioCommandHandler } from './update-portfolio.handlers';

export const CardCommandHandlers = [
  CreatePortfolioCommandHandler,
  UpdatePortfolioCommandHandler,
  DeletePortfolioCommandHandler,
];
