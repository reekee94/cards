import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { Token as TokenEntity } from './token.entity';
import { User } from '../user/user.entity';

@Injectable()
export class TokenRepository {
  async saveToken(user: User, refreshToken: string, qr: QueryRunner) {
    const refreshRepository = this._getRepository(qr);
    const tokenMetadata = await this.findTokenByEmail(user.email, qr);

    if (tokenMetadata) {
      tokenMetadata.refreshToken = refreshToken;

      return await refreshRepository.save(tokenMetadata);
    }
    const token = refreshRepository.create({ refreshToken, user: user });

    return await refreshRepository.save(token);
  }

  async removeToken(refreshToken: string, qr: QueryRunner) {
    const refreshRepository = this._getRepository(qr);
    const tokenData = await refreshRepository.delete({ refreshToken });

    return tokenData;
  }

  async findToken(refreshToken: string, qr: QueryRunner) {
    const refreshRepository = this._getRepository(qr);
    const tokenData = await refreshRepository.findOneBy({ refreshToken });

    return tokenData;
  }

  async findTokenByEmail(email: string, qr: QueryRunner) {
    const refreshRepository = this._getRepository(qr);
    const tokenData = await refreshRepository.findOneBy({
      user: { email: email },
    });

    return tokenData;
  }

  private _getRepository(qr: QueryRunner) {
    return qr.manager.getRepository(TokenEntity);
  }
}
