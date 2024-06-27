import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { Employee } from '../entities/employee.entity';

@Injectable()
export class EmployeeRepository {
  async create(employeeData: any, qr: QueryRunner) {
    const repo = this._getRepository(qr);

    const employee = repo.create(employeeData);
    return await repo.save(employee);
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
    return qr.manager.getRepository(Employee);
  }

  async save(employee: Employee, qr: QueryRunner): Promise<Employee> {
    const repo = this._getRepository(qr);
    return await repo.save(employee);
  }
}