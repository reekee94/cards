import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { runWithQueryRunner } from 'src/common/utils/runWithQueryRunner';
import { RegisterAdminUserCommand } from '../impl/register-admin.command';
import { DataSource } from 'typeorm';
import { UserRepository } from '../../user.repository';

@CommandHandler(RegisterAdminUserCommand)
export class RegisterUserCommandHandler
  implements ICommandHandler<RegisterAdminUserCommand>
{
  constructor(
    private readonly _dataSource: DataSource,
    private readonly _userRepository: UserRepository,
  ) {}

  async execute(command: RegisterAdminUserCommand) {
    return await runWithQueryRunner(this._dataSource, async (qr) => {
      const { email, password } = command;

      const candidate = await this._userRepository.findOneByEmail(email, qr);

      if (candidate) {
        throw new BadRequestException('This email is already in use.');
      }

      await this._userRepository.create(email, password, 'admin', qr);
    });
  }
}
