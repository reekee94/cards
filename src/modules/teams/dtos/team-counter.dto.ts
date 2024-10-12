import { ApiProperty } from '@nestjs/swagger';

export class TeamCounterDto {
  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 5000 })
  steps: number;
}

export class TeamCountersResponseDto {
  @ApiProperty({ type: [TeamCounterDto] })
  counters: TeamCounterDto[];
}
