export class CreateCounterCommand {
  constructor(
    public readonly teamId: number,
    public readonly steps: number,
    public readonly owner: any,  // Assuming you store user details for validation
  ) {}
}
