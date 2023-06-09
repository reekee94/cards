import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardController } from './card.controller';
import { CardRepository } from './repositories/card.repository';
import { CardQueryHandlers } from './queries/handlers';
import { Card } from './entities/card.entity';
import { CardsSeed } from './seeds/card-type.seed';
import { CardType } from './entities/card_type.entity';
import { CardTypeRepository } from './repositories/card_type.repository';
import { CardCommandHandlers } from './commands/handlers';

@Module({
  imports: [TypeOrmModule.forFeature([Card, CardType]), CqrsModule],
  controllers: [CardController],
  providers: [
    CardRepository,
    ...CardQueryHandlers,
    ...CardCommandHandlers,
    CardsSeed,
    CardTypeRepository,
  ],
  exports: [CardRepository, CardsSeed, CardTypeRepository],
})
export class CardModule {}
