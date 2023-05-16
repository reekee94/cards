import { CreateCardCommandHandler } from './create-card.handler';
import { DeleteCardCommandHandler } from './delete-card.handler';
import { UpdateCardCommandHandler } from './update-card.handler';

export const CardCommandHandlers = [
  CreateCardCommandHandler,
  UpdateCardCommandHandler,
  DeleteCardCommandHandler,
];
