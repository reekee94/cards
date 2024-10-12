import { ApiProperty } from '@nestjs/swagger';

export class TeamTotalStepsDto {
  @ApiProperty({ example: 15000 })
  totalSteps: number;
}