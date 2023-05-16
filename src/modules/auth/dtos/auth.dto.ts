import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { passwordRegex } from 'src/common/constants/regex';
// import { EmailDto } from 'src/modules/email/dtos/email.dto';

// export class AuthDto extends EmailDto {
export class AuthDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(16)
  @Matches(passwordRegex, {
    message:
      'The password must contain only letters and numbers and contain at least 1 capital letter.',
  })
  @ApiProperty()
  password: string;
}
