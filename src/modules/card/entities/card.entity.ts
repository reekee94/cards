import { DefaultFields } from 'src/common/utils/default.fields';
import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/user.entity';
import { CardType } from './card_type.entity';

@Entity()
export class Card extends DefaultFields {
  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  // @JoinColumn()
  owner: User;

  @ManyToOne(() => CardType, (cardType) => cardType.cards, { eager: true })
  cardType: CardType;
}
