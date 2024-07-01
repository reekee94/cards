import { ApiProperty } from '@nestjs/swagger';
import { Portfolio } from '../entities/portfolio.entity';
import { PortfolioImage } from 'src/modules/portfolio_image/entities/portfolio_image.entity';

export class 

DefaultPortfolioDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  // @ApiProperty()
  // image: PortfolioImage | undefined;

  @ApiProperty()
  owner: number;

  static fromEntity(entity: Portfolio) {
    const dto = new DefaultPortfolioDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.description = entity.description;
    // dto.image = entity.image ? entity.image : undefined;
    dto.owner = entity.owner.id;
    return dto;
  }
}