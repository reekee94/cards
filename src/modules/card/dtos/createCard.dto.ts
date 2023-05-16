import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { CardTypesType } from 'src/common/constants';

export class CreateCardDto {
  @ApiProperty()
  @IsString()
  @Length(1, 32)
  name: string;

  @ApiProperty()
  cardType: CardTypesType;

  // static fromEntity(entity: Card) {
  //   const dto = new CreateCardDto();
  //   dto.id = entity.id;
  //   dto.name = entity.name;
  //   return dto;
  // }
}
