import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PaginationDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  page: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  limit: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  direction: string;
}
