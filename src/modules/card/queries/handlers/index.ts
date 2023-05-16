import { GetCardByIdQueryHandler } from './get-card-by-id.handler';
import { GetCardsListQueryHandler } from './get-cards-list.handler';

export const CardQueryHandlers = [
  GetCardsListQueryHandler,
  GetCardByIdQueryHandler,
];
