export class DeleteCardCommand {
  constructor(
    public readonly cardId: number,
    public readonly ownerId: number,
  ) {}
}
