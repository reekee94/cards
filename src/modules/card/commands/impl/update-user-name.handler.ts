export class UpdateUserNameCommand {
  constructor(public readonly email: string, public readonly name: string) {}
}
