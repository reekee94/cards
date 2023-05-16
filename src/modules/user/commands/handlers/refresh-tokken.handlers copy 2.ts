import { UnauthorizedException } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { runWithQueryRunner } from 'src/common/utils/runWithQueryRunner';
import { GenerateTokensCommand } from 'src/modules/token/commands/impl/generate-tokens.command';
import { IGeneratedTokens } from 'src/modules/token/token.service';
import { DataSource } from 'typeorm';
import { RefreshUserCommand } from '../impl/refresh.command';
import { UserRepository } from '../../user.repository';
import { DefaultUserDto } from '../../dtos/defaultUser.dto';

@CommandHandler(RefreshUserCommand)
export class RefreshUserCommandHandler
  implements ICommandHandler<RefreshUserCommand>
{
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _dataSource: DataSource,
    private readonly _bbidRepository: UserRepository,
  ) {}

  async execute(command: RefreshUserCommand) {
    return await runWithQueryRunner(this._dataSource, async (qr) => {
      const { user } = command;

      const candidate = await this._bbidRepository.findOneById(user.id, qr);

      if (!candidate) {
        throw new UnauthorizedException();
      }

      const tokens: IGeneratedTokens = await this._commandBus.execute(
        new GenerateTokensCommand(candidate, qr),
      );

      return { user: new DefaultUserDto(candidate), tokens };
    });
  }
}
