import { DefaultFields } from 'src/common/utils/default.fields';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Card } from '../../card/entities/card.entity';
import { CardImageComment } from './card_image_comment.entity';

@Entity()
export class CardImage extends DefaultFields {
  @Column()
  url: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(
    () => CardImageComment,
    (cardImageComment) => cardImageComment.cardImage,
    { eager: true },
  )
  comments: CardImageComment[];

  @ManyToOne(() => Card, (card) => card.id)
  card: Card;
}
