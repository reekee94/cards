import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreatePortfolioImageDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  @IsOptional()
  file: any;

  @ApiProperty()
  @IsString()
  imageName: string;

  @ApiProperty()
  @IsString()
  imageDescription: string;
}