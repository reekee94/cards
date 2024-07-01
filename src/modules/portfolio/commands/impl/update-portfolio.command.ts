export class UpdatePortfolioCommand {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly ownerId: number,
    public readonly description: string,
  ) {}
}
