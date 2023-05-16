import { CardTypesType } from 'src/common/constants';

export class UpdateCardCommand {
  constructor(
    public readonly cardId: number,
    public readonly name: string,
    public readonly ownerId: number,
    public readonly cardType: CardTypesType,
  ) {}
}
