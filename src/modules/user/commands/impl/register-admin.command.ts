export class RegisterAdminUserCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}
