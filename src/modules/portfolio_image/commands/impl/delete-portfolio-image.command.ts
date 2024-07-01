import { User } from "src/modules/user/user.entity";

export class DeletePortfolioImageCommand {
    constructor(
      public readonly imageId: number,
      public readonly user: User,
    ) {}
  }
  