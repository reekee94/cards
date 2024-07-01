import { DefaultFields } from 'src/common/utils/default.fields';
import { Entity, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Token } from '../token/token.entity';
import { Portfolio } from '../portfolio/entities/portfolio.entity';


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

  @OneToMany(() => Portfolio, (card) => card.owner, {
    onDelete: 'CASCADE',
    nullable: true,
    // eager: true,
  })
  cards: Portfolio;
}
