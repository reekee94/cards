import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IJwtConfig } from 'src/common/configs/jwt.config';
import { ConfigNames } from 'src/common/types/enums/configNames.enum';
import { DefaultUserDto } from '../user/dtos/defaultUser.dto';

export interface IGeneratedTokens {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class TokenService {
  private readonly _config: IJwtConfig;
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _configService: ConfigService,
  ) {
    const config = this._configService.get<IJwtConfig>(ConfigNames.JWT);
    if (!config) {
      throw new Error('JWT config does not exists');
    }
    this._config = config;
  }

  public generateTokens(payload: DefaultUserDto): IGeneratedTokens {
    const accessToken = this._jwtService.sign(
      { ...payload },
      {
        secret: this._config.accessTokenSecret,
        expiresIn: this._config.accessTokenLife,
      },
    );
    const refreshToken = this._jwtService.sign(
      {
        ...payload,
      },
      {
        secret: this._config.refreshTokenSecret,
        expiresIn: this._config.refreshTokenLife,
      },
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  public validateAccessToken(token: string) {
    const userData = this._validateToken(token, this._config.accessTokenSecret);
    return userData;
  }

  public validateRefreshToken(token: string) {
    const userData = this._validateToken(
      token,
      this._config.refreshTokenSecret,
    );
    return userData;
  }

  private _validateToken(token: string, secret: string): DefaultUserDto | null {
    try {
      const userData = this._jwtService.verify(token, {
        secret,
      });
      return new DefaultUserDto(userData);
    } catch (e) {
      return null;
    }
  }
}
