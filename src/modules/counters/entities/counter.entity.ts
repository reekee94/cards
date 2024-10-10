import { DefaultFields } from 'src/common/utils/default.fields';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Team } from '../../teams/entities/team.entity';

@Entity()
export class Counter extends DefaultFields {
  @Column({ default: 0 })
  steps: number; // Stores the step count for the counter (team member)

  @Column()
  teamId: number; // Foreign key to reference the team (formerly portfolioId)

  @ManyToOne(() => Team, (team) => team.counters, { eager: true }) // Assume Team has counters relation
  @JoinColumn({ name: 'teamId' })
  team: Team;
}
