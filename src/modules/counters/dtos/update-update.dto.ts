import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class UpdateCounterDto {
  @ApiProperty({ example: 1500, description: 'Updated step count' })
  @IsNumber()
  @Min(0)
  steps: number;
}
