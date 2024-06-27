// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { IJwtConfig } from 'src/common/configs/jwt.config';
// import { ConfigNames } from 'src/common/types/enums/configNames.enum';

// export const refreshStrategyName = 'jwt';

// @Injectable()
// export class JwtRefreshStrategy extends PassportStrategy(
//   Strategy,
//   refreshStrategyName,
// ) {
//   constructor(configService: ConfigService) {
//     const config = configService.get<IJwtConfig>(ConfigNames.JWT);
//     if (!config) {
//       throw new Error('JWT config does not exists');
//     }
//     super({
//       jwtFromRequest: ExtractJwt.fromExtractors([
//         (req) => {
//           return req?.cookies?.refreshToken;
//         },
//       ]),
//       secretOrKey: config.refreshTokenSecret,
//       ignoreExpiration: false,
//     });
//   }

//   async validate(payload: any) {
//     return payload;
//   }
// }
