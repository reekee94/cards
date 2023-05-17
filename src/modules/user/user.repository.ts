import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { User as UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
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

  async findOneById(id: number, qr: QueryRunner) {
    const userRepo = this._getRepository(qr);
    const candidate = await userRepo.findOne({
      where: { id },
    });

    return candidate;
  }

  async updateUserName(user: UserEntity, name: string, qr: QueryRunner) {
    const repo = this._getRepository(qr);
    user.name = name;
    return await repo.save(user);
  }

  private _getRepository(qr: QueryRunner) {
    return qr.manager.getRepository(UserEntity);
  }
}
