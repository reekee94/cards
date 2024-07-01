import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { DeleteUserCommand } from '../impl/detete-user.command';
import { User } from '../../user.entity';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(command: DeleteUserCommand): Promise<void> {
    const { userId } = command;

    const user = await this.userRepository.findOneById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    await this.userRepository.remove(user);
  }
}
