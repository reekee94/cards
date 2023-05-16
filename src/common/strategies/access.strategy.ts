import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IJwtConfig } from 'src/common/configs/jwt.config';
import { ConfigNames } from 'src/common/types/enums/configNames.enum';

export const accessStrategyName = 'jwt';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  accessStrategyName,
) {
  constructor(configService: ConfigService) {
    const config = configService.get<IJwtConfig>(ConfigNames.JWT);
    if (!config) {
      throw new Error('JWT config does not exists');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.accessTokenSecret,
      ignoreExpiration: false,
    });
  }

  validate(payload: any) {
    return payload;
  }
}
