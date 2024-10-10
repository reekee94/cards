import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class CreateCounterDto {
  @ApiProperty({ example: 1000, description: 'Initial step count' })
  @IsNumber()
  @Min(0)
  steps: number;
}