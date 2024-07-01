import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Patch,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { AccessTokenGuard } from 'src/common/guards/access.guard';
import { MessageResponse } from 'src/common/models/messageResponse';
import { GuardedRequest } from 'src/common/models/models';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UpdatePasswordCommand } from './commands/impl/update-user-password.command';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { DeleteUserCommand } from './commands/impl/detete-user.command';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Patch('password')
  @ApiOkResponse({ type: MessageResponse })
  @ApiBearerAuth()
  @ApiBody({ type: ChangePasswordDto })
  async changePassword(
    @Req() req: GuardedRequest,
    @Body() changePasswordDto: ChangePasswordDto,
    @Res() res: Response,
  ) {
    const user = req.user;
    const { currentPassword, newPassword } = changePasswordDto;

    await this._commandBus.execute(
      new UpdatePasswordCommand(user.id, currentPassword, newPassword),
    );

    res
      .status(HttpStatus.OK)
      .json(new MessageResponse('Password successfully changed'));
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  @ApiOkResponse({ type: MessageResponse })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number })
  async deleteUser(
    @Req() req: GuardedRequest,
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    const user = req.user;

    if (user.id !== id) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json(new MessageResponse('You can only delete your own account'));
    }

    await this._commandBus.execute(new DeleteUserCommand(id));

    res
      .status(HttpStatus.OK)
      .json(new MessageResponse('User successfully deleted'));
  }
}
