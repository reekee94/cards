import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { runWithQueryRunner } from 'src/common/utils/runWithQueryRunner';
import { TokenRepository } from 'src/modules/token/token.repository';
import { DataSource } from 'typeorm';
import { LogoutUserCommand } from '../impl/logout.command';

@CommandHandler(LogoutUserCommand)
export class LogoutUserCommandHandler
  implements ICommandHandler<LogoutUserCommand>
{
  constructor(
    private readonly _dataSource: DataSource,
    private readonly _tokenRepository: TokenRepository,
  ) {}

  async execute(command: LogoutUserCommand) {
    return await runWithQueryRunner(this._dataSource, async (qr) => {
      const { refreshToken } = command;

      await this._tokenRepository.removeToken(refreshToken, qr);
    });
  }
}
