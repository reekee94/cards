import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
// import { BbidUserDto } from 'src/modules/bbid/dtos/bbidUser.dto';
import { TokenRepository } from '../../token.repository';
import { TokenService } from '../../token.service';
import { GenerateTokensCommand } from '../impl/generate-tokens.command';
import { DefaultUserDto } from 'src/modules/user/dtos/defaultUser.dto';

@CommandHandler(GenerateTokensCommand)
export class GenerateTokensCommandHandler
  implements ICommandHandler<GenerateTokensCommand>
{
  constructor(
    private readonly _tokenRepository: TokenRepository,
    private readonly _tokenService: TokenService,
  ) {}

  async execute(command: GenerateTokensCommand) {
    const { user, qr } = command;

    const dto = new DefaultUserDto(user);

    const tokens = this._tokenService.generateTokens(dto);

    await this._tokenRepository.saveToken(user, tokens.refreshToken, qr);

    return tokens;
  }
}
