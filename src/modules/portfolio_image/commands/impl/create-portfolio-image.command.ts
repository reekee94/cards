import { User } from "src/modules/user/user.entity";


export class CreatePortfolioImageCommand {
  constructor(
    public readonly portfolioId: number,
    public readonly file: Buffer,
    public readonly imageName: string,
    public readonly imageDescription: string,
    public readonly user: User,
  ) {}
}