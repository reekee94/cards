import { DefaultFields } from 'src/common/utils/default.fields';
import { Entity, Column, ManyToOne, OneToMany, OneToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Portfolio } from '../../portfolio/entities/portfolio.entity';
import { PortfolioImageComment } from './portfolio_image_comment.entity';


@Entity()
export class PortfolioImage extends DefaultFields {
  @Column('bytea', { nullable: true })
  data: Buffer;

  @Column()
  image_name: string;

  @Column()
  image_description: string;

  @Column()
  portfolioId: number;

  @OneToMany(
    () => PortfolioImageComment,
    (portfolioImageComment) => portfolioImageComment.portfolioImage,
    { eager: true },
  )
  comments: PortfolioImageComment[];

  @OneToOne(() => Portfolio, (portfolio) => portfolio.image, {eager: true})
  @JoinColumn()
  portfolio: Portfolio;
}