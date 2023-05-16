import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { ICookieConfig } from 'src/common/configs/cookie.config';
import { ConfigNames } from 'src/common/types/enums/configNames.enum';

@Injectable()
export class CookieService {
  private readonly _config: ICookieConfig;

  constructor(private readonly _configService: ConfigService) {
    const config = this._configService.get<ICookieConfig>(ConfigNames.COOKIES);
    if (!config) {
      throw new Error('Cookie config does not exists');
    }
    this._config = config;
  }

  setCookie(res: Response, refreshToken: string) {
    res.cookie(this._config.refreshCookieName, refreshToken, {
      maxAge: this._config.refreshCookieLife,
      httpOnly: true,
    });
  }

  setSocialCookie(res: Response, idToken: string) {
    res.cookie(this._config.socialCookieName, idToken, {
      maxAge: this._config.refreshCookieLife,
      httpOnly: true,
    });
  }

  removeCookie(res: Response) {
    res.clearCookie(this._config.refreshCookieName);
    res.clearCookie(this._config.socialCookieName);
  }
}
