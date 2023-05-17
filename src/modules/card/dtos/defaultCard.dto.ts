import { ApiProperty } from '@nestjs/swagger';
import { Card } from '../entities/card.entity';
import { CardTypesType } from 'src/common/constants';

export class DefaultCardDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  cardType: CardTypesType;

  @ApiProperty()
  owner: number;

  static fromEntity(entity: Card) {
    const dto = new DefaultCardDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.cardType = entity.cardType.name;
    dto.owner = entity.owner.id;
    return dto;
  }
}
