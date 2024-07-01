
import { PortfolioImage } from 'src/modules/portfolio_image/entities/portfolio_image.entity';
import { User } from 'src/modules/user/user.entity';

export class CreatePortfolioCommand {
  constructor(
    public readonly name: string,
    public readonly owner: User,
    public readonly description: string,
    public readonly portfolioImage?: PortfolioImage,
  ) {}
}
