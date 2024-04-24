// import { BadRequestException } from '@nestjs/common';
// import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
// import { runWithQueryRunner } from 'src/common/utils/runWithQueryRunner';
// import { DataSource } from 'typeorm';
// import { UserRepository } from '../../../user/user.repository';
// import { UpdateUserNameCommand } from '../../../user/commands/impl/update-user-name.handler';

// @CommandHandler(UpdateUserNameCommand)
// export class UpdateUserNameCommandHandler
//   implements ICommandHandler<UpdateUserNameCommand>
// {
//   constructor(
//     private readonly _ds: DataSource,
//     private readonly _userRepo: UserRepository,
//   ) {}
//   async execute(command: UpdateUserNameCommand): Promise<any> {
//     return await runWithQueryRunner(this._ds, async (qr) => {
//       const { email, name } = command;
//       const user = await this._userRepo.findOneByEmail(email, qr);

//       if (!user) {
//         throw new BadRequestException('First you need to create a user.');
//       }

//       await this._userRepo.updateUserName(user, name, qr);
//     });
//   }
// }
