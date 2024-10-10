import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../user/user.entity';
import { Counter } from '../../counters/entities/counter.entity';
import { DefaultFields } from 'src/common/utils/default.fields';

@Entity()
export class Team extends DefaultFields {

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  owner: User;

  @OneToMany(() => Counter, (counter) => counter.team, { cascade: true })
  counters: Counter[];

  @Column({ default: 0 })
  totalSteps: number;

  calculateTotalSteps(): number {
    return this.counters?.reduce((total, counter) => total + counter.steps, 0) || 0;
  }
}
