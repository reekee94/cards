import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class EmployeeDonationRewardDto {
  @ApiProperty({
    description: 'The unique identifier of the employee',
    example: 123,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'The name of the employee',
    example: 'John',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The surname of the employee',
    example: 'Doe',
  })
  @IsString()
  surname: string;

  @ApiProperty({
    description: 'The calculated reward based on the donation',
    example: 1500.00,
  })
  @IsNumber()
  reward: number;

  static fromEntity(entity: any): EmployeeDonationRewardDto {
    const dto = new EmployeeDonationRewardDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.surname = entity.surname;
    dto.reward = Number(entity.reward); // Ensure the reward is treated as a number
    return dto;
  }
}