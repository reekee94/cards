import { DefaultFields } from 'src/common/utils/default.fields';
import { Entity, Column, ManyToOne } from 'typeorm';
import { PortfolioImage } from './portfolio_image.entity';


@Entity()
export class PortfolioImageComment extends DefaultFields {
  @Column()
  text: string;

  @ManyToOne(() => PortfolioImage, (portfolioImage) => portfolioImage.comments)
  portfolioImage: PortfolioImage;
}
