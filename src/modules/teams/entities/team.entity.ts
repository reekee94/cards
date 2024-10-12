import { Entity, Column, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../../user/user.entity';
import { DefaultFields } from 'src/common/utils/default.fields';

@Entity()
export class Team extends DefaultFields {

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @OneToMany(() => User, (user) => user.team, { cascade: true })
  members: User[];
}
