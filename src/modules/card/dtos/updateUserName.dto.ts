import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class UpdateUserNameDto {
  @ApiProperty()
  @IsString()
  @Length(4, 32)
  name: string;
}
