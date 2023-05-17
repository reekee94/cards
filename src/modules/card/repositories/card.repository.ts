import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { Card } from '../entities/card.entity';
import { CardType } from '../entities/card_type.entity';
import { User } from 'src/modules/user/user.entity';

@Injectable()
export class CardRepository {
  async create(name: string, owner: User, cardType: CardType, qr: QueryRunner) {
    const repo = this._getRepository(qr);
    const newCard = new Card();
    newCard.cardType = cardType;
    newCard.name = name;
    newCard.owner = owner;
    return repo.save(newCard);
  }

  async update(card: Card, qr: QueryRunner) {
    const repo = this._getRepository(qr);
    return await repo.save(card);
  }

  async delete(card: Card, qr: QueryRunner) {
    const repo = this._getRepository(qr);
    return await repo.delete(card);
  }

  async findAll(qr: QueryRunner) {
    const repo = this._getRepository(qr);
    const cards = await repo.find();
    return cards;
  }

  async findOneById(id: number, qr: QueryRunner) {
    const repo = this._getRepository(qr);
    const card = await repo.findOne({ where: { id } });
    return card;
  }

  async findOneByNameAndOwner(name: string, ownerId: number, qr: QueryRunner) {
    const repo = this._getRepository(qr);
    const card = await repo.findOne({
      where: { name: name, owner: { id: ownerId } },
    });
    return card;
  }

  private _getRepository(qr: QueryRunner) {
    return qr.manager.getRepository(Card);
  }
}
