import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { runWithQueryRunner } from 'src/common/utils/runWithQueryRunner';
import { DataSource } from 'typeorm';
import { UserRepository } from '../../user.repository';
import { AddUserCommand } from '../impl/add-user.handler';


@CommandHandler(AddUserCommand)
export class AddUserCommandHandler
  implements ICommandHandler<AddUserCommand>
{
  constructor(
    private readonly _ds: DataSource,
    private readonly _userRepo: UserRepository,
  ) {}
  async execute(command: AddUserCommand): Promise<any> {
    return await runWithQueryRunner(this._ds, async (qr) => {
      const { email, name } = command;
      const user = await this._userRepo.findOneByEmail(email, qr);

      if (user) {
        throw new BadRequestException('Allready created');
      }

      return await this._userRepo.create(email, name, 'basic', qr);
    });
  }
}
