import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { User } from 'src/modules/user/user.entity';
import { Counter } from '../../counters/entities/counter.entity';
import { Team } from '../entities/team.entity';

@Injectable()
export class TeamRepository {
  async create(
    name: string,
    description: string,
    owner: User,
    counters: Counter[] | undefined,
    qr: QueryRunner,
  ) {
    const repo = this._getRepository(qr);
    const newTeam = new Team();
    newTeam.name = name;
    newTeam.description = description;
    newTeam.owner = owner;
    newTeam.counters = counters || [];
    newTeam.totalSteps = newTeam.calculateTotalSteps(); // Automatically set total steps
    return repo.save(newTeam);
  }

  async update(team: Team, qr: QueryRunner) {
    const repo = this._getRepository(qr);
    team.totalSteps = team.calculateTotalSteps(); // Recalculate total steps
    return await repo.save(team);
  }

  async delete(team: Team, qr: QueryRunner) {
    const repo = this._getRepository(qr);
    return await repo.delete(team.id);
  }

  async findAll(qr: QueryRunner) {
    const repo = this._getRepository(qr);
    const teams = await repo.find({ relations: ['owner', 'counters'] });
    return teams;
  }

  async findOneById(id: number, qr: QueryRunner) {
    const repo = this._getRepository(qr);
    const team = await repo.findOne({ where: { id }, relations: ['owner', 'counters'] });
    return team;
  }

  async findOneByOwnerId(ownerId: number, qr: QueryRunner) {
    const repo = this._getRepository(qr);
    const team = await repo.findOne({ where: { owner: { id: ownerId } }, relations: ['owner', 'counters'] });
    return team;
  }

  async findOneByCounterId(counterId: number, qr: QueryRunner) {
    const repo = this._getRepository(qr);
    const team = await repo.findOne({ where: { counters: { id: counterId } }, relations: ['owner', 'counters'] });
    return team;
  }

  private _getRepository(qr: QueryRunner) {
    return qr.manager.getRepository(Team);
  }
}
