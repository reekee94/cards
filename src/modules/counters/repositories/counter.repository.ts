import { Injectable } from '@nestjs/common';
import { QueryRunner, Repository, FindManyOptions } from 'typeorm';
import { Counter } from '../entities/counter.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CounterRepository {
  constructor(
    @InjectRepository(Counter)
    private readonly repo: Repository<Counter>,
  ) {}

  async create(teamId: number, initialSteps: number, qr: QueryRunner) {
    const counterRepo = this._getRepository(qr);

    const newCounter = counterRepo.create({
      steps: initialSteps,
      teamId
    });

    return await counterRepo.save(newCounter);
  }

  async update(counter: Counter, qr: QueryRunner) {
    return this._getRepository(qr).save(counter);
  }

  async delete(counter: Counter, qr: QueryRunner) {
    return await qr.manager.remove(counter);
  }

  async findAll(qr?: QueryRunner) {
    const repository = qr ? qr.manager.getRepository(Counter) : this.repo;
    return await repository.find({ relations: ['team'] });
  }

  async findOneById(id: number, qr?: QueryRunner) {
    const repository = qr ? qr.manager.getRepository(Counter) : this.repo;
    return await repository.findOne({ where: { id }, relations: ['team'] });
  }

  async findAndCount(options: FindManyOptions<Counter>, qr: QueryRunner) {
    const counterRepo = this._getRepository(qr);
    return await counterRepo.findAndCount(options);
  }

  private _getRepository(qr: QueryRunner) {
    return qr.manager.getRepository(Counter);
  }
}
