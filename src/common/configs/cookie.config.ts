import { registerAs } from '@nestjs/config';
import {
  accessLifeMultiplier,
  refreshLifeMultiplier,
} from 'src/common/constants/jwt';
import { DAY, HOUR } from 'src/common/constants/time';
import { ConfigNames } from 'src/common/types/enums/configNames.enum';

export interface ICookieConfig {
  accessCookieName: string;
  refreshCookieName: string;
  socialCookieName: string;
  accessCookieLife: number;
  refreshCookieLife: number;
}

export default registerAs(ConfigNames.COOKIES, () => {
  const config: ICookieConfig = {
    accessCookieName: 'accessToken',
    refreshCookieName: 'refreshToken',
    socialCookieName: 'socialRefreshToken',
    accessCookieLife: accessLifeMultiplier * HOUR,
    refreshCookieLife: refreshLifeMultiplier * DAY,
  };

  return config;
});
