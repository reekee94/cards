import { CreateCardCommandHandler } from './create-card.handlers';
import { DeleteCardCommandHandler } from './delete-card.handlers';
import { UpdateCardCommandHandler } from './update-card.handlers';

export const CardCommandHandlers = [
  CreateCardCommandHandler,
  UpdateCardCommandHandler,
  DeleteCardCommandHandler,
];
