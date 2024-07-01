import { User } from "src/modules/user/user.entity";

export class UpdatePortfolioImageCommand {
  constructor(
    public readonly imageId: number,
    public readonly user: User,
    public readonly file?: Buffer | null,
    public readonly name?: string,
    public readonly description?: string,
  ) {}
}