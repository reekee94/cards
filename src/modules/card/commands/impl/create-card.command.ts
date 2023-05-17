import { CardTypesType } from 'src/common/constants';
import { User } from 'src/modules/user/user.entity';

export class CreateCardCommand {
  constructor(
    public readonly name: string,
    public readonly owner: User,
    public readonly cardType: CardTypesType,
  ) {}
}
