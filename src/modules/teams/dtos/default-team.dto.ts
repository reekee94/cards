import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/user/user.entity';
import { Team } from '../entities/team.entity';

export class DefaultTeamDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  totalSteps: number;

  @ApiProperty({ type: () => User })
  owner: User;

  static fromEntity(team: Team): DefaultTeamDto {
    const dto = new DefaultTeamDto();
    dto.id = team.id;
    dto.name = team.name;
    dto.description = team.description;
    dto.totalSteps = team.calculateTotalSteps();
    dto.owner = team.owner;
    return dto;
  }
}
