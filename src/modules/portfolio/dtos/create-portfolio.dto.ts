import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreatePortfolioDto {
  @ApiProperty()
  @IsString()
  @Length(1, 32)
  name: string;

  @ApiProperty()
  @IsString()
  @Length(0, 255)
  description: string;
}
