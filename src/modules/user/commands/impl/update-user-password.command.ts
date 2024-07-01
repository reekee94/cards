export class UpdatePasswordCommand {
    constructor(
      public readonly userId: number,
      public readonly currentPassword: string,
      public readonly newPassword: string,
    ) {}
  }
  