export class DeleteTeamCommand {
  constructor(
    public readonly id: number,
    public readonly userId: number,
  ) {}
}
