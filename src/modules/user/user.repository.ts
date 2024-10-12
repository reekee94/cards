import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { User as UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(private readonly dataSource: DataSource) {}

  
  async create(email: string, password: string, qr: QueryRunner) {
    const userRepo = this._getRepository(qr);
    const newUser = userRepo.create({ password: password, email: email });
    return await userRepo.save(newUser);
  }

  async findOneByEmail(email: string, qr: QueryRunner) {
    const userRepo = this._getRepository(qr);
    const candidate = await userRepo.findOne({
      where: { email },
    });

    return candidate;
  }

  async findOneById(id: number, qr?: QueryRunner) {
    const userRepo = qr ? this._getRepository(qr) : this._getDefaultRepository();
    const candidate = await userRepo.findOne({
      where: { id },
    });

    return candidate;
  }

  private _getRepository(qr: QueryRunner) {
    return qr.manager.getRepository(UserEntity);
  }

  private _getDefaultRepository(): Repository<UserEntity> {
    return this.dataSource.getRepository(UserEntity);
  }
}
