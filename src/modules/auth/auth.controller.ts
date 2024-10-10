import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ICookieConfig } from 'src/common/configs/cookie.config';
import { RefreshTokenGuard } from 'src/common/guards/refresh.guard';
import { ConfigNames } from 'src/common/types/enums/configNames.enum';
import { MessageResponse } from 'src/common/models/messageResponse';
import {
  ApiOkResponseWithBody,
  SuccessResponseWithBody,
} from 'src/common/models/successResponseWithBody';
import { CookieService } from '../cookie/cookie.service';
import { IGeneratedTokens } from '../token/token.service';
import { AuthDto } from './dtos/auth.dto';
import { AuthResponseDto } from './dtos/authResponse.dto';
import { DefaultUserDto } from '../user/dtos/defaultUser.dto';
import { RefreshUserCommand } from '../user/commands/impl/refresh.command';
import { LoginUserCommand } from '../user/commands/impl/login.command';
import { RegisterAdminUserCommand } from '../user/commands/impl/register-admin.command';
import { LogoutUserCommand } from '../user/commands/impl/logout.command';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  private readonly _cookieConfig: ICookieConfig;
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _cookieService: CookieService,
    private readonly _configService: ConfigService,
  ) {
    const config = this._configService.get<ICookieConfig>(ConfigNames.COOKIES);
    if (!config) {
      throw new Error('Cookie config does not exists');
    }
    this._cookieConfig = config;
  }

  @Post('register')
  @ApiBody({
    type: AuthDto,
    examples: {
      email: { value: { email: 'example@mail.com', password: 'Cards123' } },
    },
  })
  @ApiOkResponse({
    schema: { example: new MessageResponse('Success') },
    type: MessageResponse,
  })
  async register(@Body() body: AuthDto, @Res() res: Response) {
    await this._commandBus.execute(
      new RegisterAdminUserCommand(body.email, body.password),
    );

    res.status(HttpStatus.OK).json(new MessageResponse('Success'));
  }

  @Post('login')
  @ApiBody({
    type: AuthDto,
    examples: {
      email: { value: { email: 'example@mail.com', password: 'Cards123' } },
    },
  })
  @ApiOkResponseWithBody(AuthResponseDto)
  async login(@Body() body: AuthDto, @Res() res: Response) {
    const result: { user: DefaultUserDto; tokens: IGeneratedTokens } =
      await this._commandBus.execute(
        new LoginUserCommand(body.email, body.password),
      );

    const response = new AuthResponseDto(
      result.user,
      result.tokens.accessToken,
    );

    this._cookieService.setCookie(res, result.tokens.refreshToken);

    res.status(HttpStatus.OK).json(new SuccessResponseWithBody(response));
  }

  @Post('logout')
  @ApiOkResponse({
    schema: { example: new MessageResponse('Successfully logged out') },
    type: MessageResponse,
  })
  async logout(@Req() req: Request, @Res() res: Response) {
    const refreshToken: string | undefined =
      req.cookies[this._cookieConfig.refreshCookieName];

    if (refreshToken) {
      await this._commandBus.execute(new LogoutUserCommand(refreshToken));
    }

    this._cookieService.removeCookie(res);
    res
      .status(HttpStatus.OK)
      .json(new MessageResponse('Successfully logged out'));
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  @ApiOkResponseWithBody(AuthResponseDto)
  async refresh(
    @Req() req: Request & { user: DefaultUserDto },
    @Res() res: Response,
  ) {
    const result: { user: DefaultUserDto; tokens: IGeneratedTokens } =
      await this._commandBus.execute(new RefreshUserCommand(req.user));

    const response = new AuthResponseDto(
      result.user,
      result.tokens.accessToken,
    );

    this._cookieService.setCookie(res, result.tokens.refreshToken);

    res.status(HttpStatus.OK).json(new SuccessResponseWithBody(response));
  }
}
