import { ApiProperty } from '@nestjs/swagger';
import { User as UserEntity } from '../user.entity';

export class DefaultUserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: string;

  @ApiProperty({ nullable: true })
  name: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(entity: UserEntity) {
    this.id = entity.id;
    this.email = entity.email;
    this.name = entity.name;
    this.role = entity.role;
  }
}
