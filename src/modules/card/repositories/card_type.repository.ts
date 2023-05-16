import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { CardType } from '../entities/card_type.entity';
import { CardTypesType } from 'src/common/constants';

@Injectable()
export class CardTypeRepository {
  async createOne(name: CardTypesType, qr: QueryRunner) {
    const repo = this._getRepository(qr);

    const ent = repo.create();
    ent.name = name;

    return await repo.save(ent);
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

  async findOneByName(name: CardTypesType, qr: QueryRunner) {
    const repo = this._getRepository(qr);
    const card = await repo.findOne({ where: { name: name } });
    return card;
  }

  private _getRepository(qr: QueryRunner) {
    return qr.manager.getRepository(CardType);
  }
}
