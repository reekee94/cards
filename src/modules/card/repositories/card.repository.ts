import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { Card } from '../entities/card.entity';

@Injectable()
export class CardRepository {
  async create(name, ownerId, cardType, qr: QueryRunner) {
    const repo = this._getRepository(qr);
    const newCard = new Card();
    newCard.cardType = cardType;
    newCard.name = name;
    newCard.owner = ownerId;
    return repo.save(newCard);
  }

  async update(card: Card, qr: QueryRunner) {
    const repo = this._getRepository(qr);
    return await repo.save(card);
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
