import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { CardTypeRepository } from '../repositories/card_type.repository';
import { cardTypes } from 'src/common/constants';

@Injectable()
export class CardsSeed {
  private readonly _cardTypes = cardTypes;

  constructor(private readonly _cardTypeRepo: CardTypeRepository) {}

  async plant(qr: QueryRunner) {
    await this.fillRarity(qr);
  }

  private async fillRarity(qr: QueryRunner): Promise<void> {
    const cardTypesList = Object.values(this._cardTypes);
    await Promise.all(
      cardTypesList.map(async (cardType) => {
        const isExists = await this._cardTypeRepo.findOneByName(cardType, qr);
        if (!isExists) {
          await this._cardTypeRepo.createOne(cardType, qr);
        }
      }),
    );
  }
}
