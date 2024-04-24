import { ApiProperty } from '@nestjs/swagger';
import { Card } from '../entities/card.entity';

export class DefaultCardDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  cardImages: string[];

  @ApiProperty()
  owner: number;

  static fromEntity(entity: Card) {
    const dto = new DefaultCardDto();
    dto.id = entity.id;
    dto.name = entity.image;
    dto.cardImages = entity.cardImages.map((cardImage) => cardImage.url);
    dto.owner = entity.owner.id;
    return dto;
  }
}
