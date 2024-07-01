export class DeletePortfolioCommand {
  constructor(
    public readonly id: number,
    public readonly ownerId: number,
  ) {}
}
