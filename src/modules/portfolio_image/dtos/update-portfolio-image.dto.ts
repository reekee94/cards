import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePortfolioImageDto {
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  file?: any;

  @ApiProperty()
  @IsString()
  ImageName: string;

  @ApiProperty()
  @IsString()
  ImageDescription: string;
}