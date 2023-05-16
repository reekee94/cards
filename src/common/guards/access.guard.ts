import {
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { TokenService } from 'src/modules/token/token.service';
import { accessStrategyName } from '../strategies/access.strategy';

@Injectable()
export class AccessTokenGuard extends AuthGuard(accessStrategyName) {
  constructor(
    @Inject(TokenService) private readonly _tokenService: TokenService,
  ) {
    super();
  }
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const accessToken = request.headers.authorization?.split(' ')[1];
    if (!accessToken) {
      throw new UnauthorizedException();
    }
    const payload = this._tokenService.validateAccessToken(accessToken);
    if (!payload) {
      throw new UnauthorizedException();
    }
    request.user = payload;
    return true;
  }
}
