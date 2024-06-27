import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { Salary } from '../entities/salary.entity';

@Injectable()
export class SalaryRepository {
  async createOne(statementData: any, qr: QueryRunner) {
    const repo = this._getRepository(qr);
    const statement = repo.create(statementData);
    return await repo.save(statement);
  }

  async findAll(qr: QueryRunner) {
    const repo = this._getRepository(qr);
    return await repo.find();
  }

  async findOneById(id: number, qr: QueryRunner) {
    const repo = this._getRepository(qr);
    return await repo.findOne({ where: { id } });
  }

  private _getRepository(qr: QueryRunner) {
    return qr.manager.getRepository(Salary);
  }
}