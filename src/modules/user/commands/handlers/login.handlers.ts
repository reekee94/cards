import { BadRequestException } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { compareStringWithHash } from 'src/common/utils/hashUtil';
import { runWithQueryRunner } from 'src/common/utils/runWithQueryRunner';
import { GenerateTokensCommand } from 'src/modules/token/commands/impl/generate-tokens.command';
import { IGeneratedTokens } from 'src/modules/token/token.service';
import { DataSource } from 'typeorm';
import { UserRepository } from '../../user.repository';
import { LoginUserCommand } from '../impl/login.command';
import { DefaultUserDto } from '../../dtos/defaultUser.dto';

@CommandHandler(LoginUserCommand)
export class LoginUserCommandHandler
  implements ICommandHandler<LoginUserCommand>
{
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _dataSource: DataSource,
    private readonly _userRepository: UserRepository,
  ) {}

  async execute(command: LoginUserCommand) {
    return await runWithQueryRunner(this._dataSource, async (qr) => {
      const { email, password } = command;

      const candidate = await this._userRepository.findOneByEmail(email, qr);

      if (!candidate) {
        throw new BadRequestException('Invalid email or password');
      }

      const result = await compareStringWithHash(password, candidate.password);

      if (!result) {
        throw new BadRequestException('Invalid email or password');
      }

      const tokens: IGeneratedTokens = await this._commandBus.execute(
        new GenerateTokensCommand(candidate, qr),
      );

      return { user: new DefaultUserDto(candidate), tokens };
    });
  }
}
