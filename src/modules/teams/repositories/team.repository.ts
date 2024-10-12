import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { Team } from '../entities/team.entity';
import { User } from '../../user/user.entity';

@Injectable()
export class TeamRepository {
  constructor(private readonly dataSource: DataSource) {}

  
  // Create a new team using QueryRunner
  async create(name: string, description: string, members: User[], qr: QueryRunner): Promise<Team> {
    const teamRepo = qr.manager.getRepository(Team);
    const newTeam = teamRepo.create({ name, description, members });
    return await teamRepo.save(newTeam);
  }

  async findAll(qr?: QueryRunner): Promise<Team[]> {
    const teamRepo = qr ? qr.manager.getRepository(Team) : this._getDefaultRepository();
    return await teamRepo.find({ relations: ['members'] });
  }

  async findOneById(id: number, qr?: QueryRunner): Promise<Team | null> {
    const teamRepo = qr ? qr.manager.getRepository(Team) : this._getDefaultRepository();
    return await teamRepo.findOne({ where: { id }, relations: ['members'] });
  }

  async update(team: Team, qr: QueryRunner): Promise<Team> {
    const teamRepo = qr.manager.getRepository(Team);
    return await teamRepo.save(team);
  }


  async delete(teamId: number, qr: QueryRunner): Promise<void> {
    const teamRepo = qr.manager.getRepository(Team);
    await teamRepo.delete(teamId);
  }

  private _getDefaultRepository(): Repository<Team> {
    return this.dataSource.getRepository(Team);
  }
}
