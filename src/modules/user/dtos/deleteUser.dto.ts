import { ApiProperty } from '@nestjs/swagger';
import { IsPositive } from 'class-validator';

export class DeletetUserDto {
  @ApiProperty()
  @IsPositive()
  id: number;
}
