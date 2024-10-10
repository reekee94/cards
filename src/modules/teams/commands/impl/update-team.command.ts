export class UpdateTeamCommand {
  constructor(
    public readonly id: number,
    public readonly name: string | undefined,
    public readonly description: string | undefined,
    public readonly ownerId: number | string,
  ) {}
}
