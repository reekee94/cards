import { CardTypesType } from 'src/common/constants';

export class CreateCardCommand {
  constructor(
    public readonly name: string,
    public readonly ownerId: number,
    public readonly cardType: CardTypesType,
  ) {}
}
