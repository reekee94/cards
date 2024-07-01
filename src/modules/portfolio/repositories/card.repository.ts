import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { Portfolio } from '../entities/portfolio.entity';
import { PortfolioImage } from '../../portfolio_image/entities/portfolio_image.entity';
import { User } from 'src/modules/user/user.entity';

// @Injectable()
// export class PortfolioRepository {
//   async create(
//     name: string,
//     owner: User,
//     portfolioImage: PortfolioImage | undefined,
//     qr: QueryRunner,
//   ) {
//     const repo = this._getRepository(qr);
//     const newCard = new Portfolio();
//     // newCard.cardImages = cardType;
//     newCard.image = name;
//     newCard.owner = owner;
//     return repo.save(newCard);
//   }

//   async update(card: Portfolio, qr: QueryRunner) {
//     const repo = this._getRepository(qr);
//     return await repo.save(card);
//   }

//   async delete(card: Portfolio, qr: QueryRunner) {
//     const repo = this._getRepository(qr);
//     return await repo.delete(card);
//   }

//   async findAll(qr: QueryRunner) {
//     const repo = this._getRepository(qr);
//     const cards = await repo.find();
//     return cards;
//   }

//   async findOneById(id: number, qr: QueryRunner) {
//     const repo = this._getRepository(qr);
//     const card = await repo.findOne({ where: { id } });
//     return card;
//   }

//   async findOneByNameAndOwner(name: string, ownerId: number, qr: QueryRunner) {
//     const repo = this._getRepository(qr);
//     const card = await repo.findOne({
//       where: { image: name, owner: { id: ownerId } },
//     });
//     return card;
//   }

//   private _getRepository(qr: QueryRunner) {
//     return qr.manager.getRepository(Portfolio);
//   }
// }


@Injectable()
export class PortfolioRepository {
  async create(
    name: string,
    description: string,
    owner: User,
    portfolioImage: PortfolioImage | undefined,
    qr: QueryRunner,
  ) {
    const repo = this._getRepository(qr);
    const newCard = new Portfolio();
    newCard.name = name;
    newCard.description = description;
    newCard.owner = owner;
    // newCard.image = portfolioImage ? portfolioImage : null;
    return repo.save(newCard);
  }

  async update(card: Portfolio, qr: QueryRunner) {
    const repo = this._getRepository(qr);
    return await repo.save(card);
  }

  async delete(card: Portfolio, qr: QueryRunner) {
    const repo = this._getRepository(qr);
    return await repo.delete(card);
  }

  async findAll(qr: QueryRunner) {
    const repo = this._getRepository(qr);
    const cards = await repo.find({ relations: ['owner', 'image'] });
    return cards;
  }

  async findOneById(id: number, qr: QueryRunner) {
    const repo = this._getRepository(qr);
    const card = await repo.findOne({ where: { id }, relations: ['owner'] });
    return card;
  }

  async findOneByOwnerId(ownerId: number, qr: QueryRunner) {
    const repo = this._getRepository(qr);
    const card = await repo.findOne({ where: { owner: { id: ownerId } }, relations: ['owner'] });
    return card;
  }

  async findOneByImageId(imageId: number, qr: QueryRunner) {
    const repo = this._getRepository(qr);
    const card = await repo.findOne({ where: { image: { id: imageId } }, relations: ['owner'] });
    return card;
  }

  private _getRepository(qr: QueryRunner) {
    return qr.manager.getRepository(Portfolio);
  }
}