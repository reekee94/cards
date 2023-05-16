import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { runWithQueryRunner } from 'src/common/utils/runWithQueryRunner';
import { DataSource } from 'typeorm';
import { DefaultUserDto } from '../../dtos/defaultUser.dto';
import { UserRepository } from '../../user.repository';
import { GetUserQuery } from '../impl/get-user.query';

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler implements IQueryHandler<GetUserQuery> {
  constructor(
    private readonly _dataSource: DataSource,
    private readonly _userRepo: UserRepository,
  ) {}
  async execute(query: GetUserQuery): Promise<DefaultUserDto | null> {
    return await runWithQueryRunner(this._dataSource, async (qr) => {
      const { email } = query;
      const user = await this._userRepo.findOneByEmail(email, qr);

      if (!user) {
        return null;
      }

      // return DefaultUserDto.fromEntity(user);
      return new DefaultUserDto(user);
    });
  }
}
