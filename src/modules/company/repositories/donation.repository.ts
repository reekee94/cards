import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { Donation } from '../entities/donation.entity';

@Injectable()
export class DonationRepository {
  async createOne(donationData: any, qr: QueryRunner) {
    const repo = this._getRepository(qr);
    const donation = repo.create(donationData);
    return await repo.save(donation);
  }

  async findAll(qr: QueryRunner) {
    const repo = this._getRepository(qr);
    return await repo.find();
  }

  async findOneById(id: number, qr: QueryRunner) {
    const repo = this._getRepository(qr);
    return await repo.findOne({ where: { id } });
  }

  async findOneByDateAndAmount(date: Date, amount: number, qr: QueryRunner) {
    const repo = this._getRepository(qr);
    return await repo.findOne({ where: { date, amount } });
  }

  private _getRepository(qr: QueryRunner) {
    return qr.manager.getRepository(Donation);
  }
}