import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { Department } from '../entities/department.entity';

@Injectable()
export class DepartmentRepository {
  async create(departmentData: any, qr: QueryRunner) {
    const repo = this._getRepository(qr);

    const department = repo.create(departmentData);
    return await repo.save(department) as unknown as Department;
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
    return qr.manager.getRepository(Department);
  }
}