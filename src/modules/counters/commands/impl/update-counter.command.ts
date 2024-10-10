export class UpdateCounterCommand {
  constructor(
    public readonly counterId: number,
    public readonly owner: any,  // User responsible for the counter
    public readonly steps: number,  // Updated step count
  ) {}
}
