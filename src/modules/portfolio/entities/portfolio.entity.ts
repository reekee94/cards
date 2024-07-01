import {
  Entity,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/user.entity';
import { PortfolioImage } from '../../portfolio_image/entities/portfolio_image.entity';
import { DefaultFields } from 'src/common/utils/default.fields';

@Entity()
export class Portfolio extends DefaultFields {

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({nullable: true})
  imageId: number;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  owner: User;

  @OneToOne(() => PortfolioImage, (image) => image.portfolio, { nullable: true, cascade: ['insert']})
  @JoinColumn()
  image: PortfolioImage;
}
