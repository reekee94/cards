import { ApiProperty } from '@nestjs/swagger';

export class FeedResponseDto {
  @ApiProperty()
  image: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  portfolioName: string;
}
