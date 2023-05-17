import { DefaultFields } from 'src/common/utils/default.fields';
import { Entity, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Token } from '../token/token.entity';
import { Card } from '../card/entities/card.entity';

@Entity()
export class User extends DefaultFields {
  @Column()
  password: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: true })
  name: string;

  @OneToOne(() => Token, (token) => token.user, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn()
  refreshToken: Token;

  @OneToMany(() => Card, (card) => card.owner, {
    onDelete: 'SET NULL',
    nullable: true,
    // eager: true,
  })
  cards: Card;
}
