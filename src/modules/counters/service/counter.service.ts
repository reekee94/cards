import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserRepository } from '../../user/user.repository';
import { TeamRepository } from '../../teams/repositories/team.repository';

@Injectable()
export class CounterService implements OnModuleInit {
  private userSteps = new Map<number, number>();
  private teamSteps = new Map<number, number>();

  constructor(
    private readonly userRepository: UserRepository,
    private readonly teamRepository: TeamRepository,
  ) {}

  async onModuleInit() {
    const teams = await this.teamRepository.findAll();
    teams.forEach((team) => {
      this.teamSteps.set(team.id, 0);
    });
  }

  async addSteps(userId: number, steps: number) {
    const user = await this.userRepository.findOneById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const currentSteps = this.userSteps.get(Number(userId)) || 0;
    this.userSteps.set(userId, currentSteps + steps);

    if (user.team) {
      await this.updateTeamSteps(user.team.id);
    }
  }

  private async updateTeamSteps(teamId: number) {
    const team = await this.teamRepository.findOneById(teamId);
    if (!team) {
      throw new Error('Team not found');
    }

    let totalSteps = 0;

    for (const member of team.members) {
      totalSteps += this.userSteps.get(member.id) || 0;
    }
    this.teamSteps.set(teamId, totalSteps);
  }

  async refreshUserSteps(userId: number) {
    const user = await this.userRepository.findOneById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    this.userSteps.set(userId, 0);

    if (user.team) {
      await this.updateTeamSteps(user.team.id);
    }
  }

  getTeamTotalSteps(teamId: number): number {
    return this.teamSteps.get(Number(teamId)) || 0;
  }

  getUserSteps(userId: number): number {
    return this.userSteps.get(Number(userId)) || 0;
  }

  async listTeamMembersWithSteps(
    teamId: number,
  ): Promise<{ userId: number; steps: number }[]> {
    const team = await this.teamRepository.findOneById(teamId);
    if (!team) {
      throw new Error('Team not found');
    }

    return team.members.map((member) => ({
      userId: member.id,
      steps: this.getUserSteps(member.id),
    }));
  }
}
