import { DefaultUserDto } from '../../dtos/defaultUser.dto';

export class RefreshUserCommand {
  constructor(public readonly user: DefaultUserDto) {}
}
