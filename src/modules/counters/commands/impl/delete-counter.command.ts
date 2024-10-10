export class DeleteCounterCommand {
  constructor(
    public readonly counterId: number,
    public readonly owner: any,  // User responsible for the counter
  ) {}
}
