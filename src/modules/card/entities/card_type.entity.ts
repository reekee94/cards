import { DefaultFields } from 'src/common/utils/default.fields';
import { Entity, Column, OneToMany } from 'typeorm';
import { Card } from './card.entity';
import { CardTypesType } from 'src/common/constants';

@Entity()
export class CardType extends DefaultFields {
  @Column()
  name: CardTypesType;

  @OneToMany(() => Card, (card) => card.cardType)
  cards: Card[];
}
