import { CreatePortfolioImageCommandHandler } from "./create-portfolio-image.handler";
import { DeletePortfolioImageCommandHandler } from "./delete-portfolio-image.handler";
import { UpdatePortfolioImageCommandHandler } from "./update-portfolio-image.handler";


export const PortfolioImageCommandHandlers = [
  CreatePortfolioImageCommandHandler,
  DeletePortfolioImageCommandHandler,
  UpdatePortfolioImageCommandHandler,
];
