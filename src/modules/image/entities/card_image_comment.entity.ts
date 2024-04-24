import { DefaultFields } from 'src/common/utils/default.fields';
import { Entity, Column, ManyToOne } from 'typeorm';
import { CardImage } from './card_image.entity';

@Entity()
export class CardImageComment extends DefaultFields {
  @Column()
  text: string;

  @ManyToOne(() => CardImage, (cardImg) => cardImg.comments)
  cardImage: CardImage;
}
