import { DefaultFields } from 'src/common/utils/default.fields';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../user/user.entity';
import { CardImage } from '../../image/entities/card_image.entity';

@Entity()
export class Card extends DefaultFields {
  @Column()
  image: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  // @JoinColumn()
  owner: User;

  @OneToMany(() => CardImage, (cardImage) => cardImage.card, { eager: true })
  cardImages: CardImage[];
}
