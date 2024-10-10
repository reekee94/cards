export class CreateTeamCommand {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly ownerId: number,
  ) {}
}