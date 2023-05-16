import { User } from 'src/modules/user/user.entity';
import { QueryRunner } from 'typeorm';

export class GenerateTokensCommand {
  constructor(public readonly user: User, public readonly qr: QueryRunner) {}
}
