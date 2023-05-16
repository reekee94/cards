import { ApiProperty } from '@nestjs/swagger';
import { DefaultUserDto } from 'src/modules/user/dtos/defaultUser.dto';

export class AuthResponseDto {
  @ApiProperty()
  user: DefaultUserDto;
  @ApiProperty()
  accessToken: string;

  constructor(user: DefaultUserDto, accessToken: string) {
    this.user = user;
    this.accessToken = accessToken;
  }
}
