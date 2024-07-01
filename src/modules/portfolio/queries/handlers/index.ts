import { GetFeedQueryHandler } from './get-feed.handler';
import { GetCardByIdQueryHandler } from './get-portfolio-by-id.handler';
import { GetCardsListQueryHandler } from './get-portfolio-list.handler';

export const CardQueryHandlers = [
  GetCardsListQueryHandler,
  GetCardByIdQueryHandler,
  GetFeedQueryHandler,
];
