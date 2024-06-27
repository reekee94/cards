// import {
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { TokenService } from 'src/modules/token/token.service';
// import { refreshStrategyName } from '../strategies/refresh.strategy';

// @Injectable()
// export class RefreshTokenGuard extends AuthGuard(refreshStrategyName) {
//   constructor(private readonly _tokenService: TokenService) {
//     super();
//   }

//   async canActivate(context: ExecutionContext) {
//     // const request = context.switchToHttp().getRequest();
//     // const refreshToken = request?.cookies?.refreshToken;

//     // if (!refreshToken) {
//     //   throw new UnauthorizedException();
//     // }

//     // const payload = this._tokenService.validateRefreshToken(refreshToken);

//     // if (!payload) {
//     //   throw new UnauthorizedException();
//     // }

//     // request.user = payload;
//     return true;
//   }
// }
