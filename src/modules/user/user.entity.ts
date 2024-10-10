import { DefaultFields } from 'src/common/utils/default.fields';
import { Entity, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Token } from '../token/token.entity';
import { Team } from '../teams/entities/team.entity';


@Entity()
export class User extends DefaultFields {
  @Column()
  password: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @OneToOne(() => Token, (token) => token.user, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn()
  refreshToken: Token;

  @OneToMany(() => Team, (team) => team.owner, {
    onDelete: 'CASCADE',
    nullable: true,
    // eager: true,
  })
  teams: Team;
}
