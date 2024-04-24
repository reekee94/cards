import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { AccessTokenGuard } from 'src/common/guards/access.guard';
import { MessageResponse } from 'src/common/models/messageResponse';
import { GuardedRequest } from 'src/common/models/models';
import { UpdateUserNameCommand } from '../card/commands/impl/update-user-name.handler';
import { UpdateUserNameDto } from '../card/dtos/updateUserName.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  @ApiOkResponse({
    type: MessageResponse,
  })
  @ApiBearerAuth()
  async setUserName(
    @Req() req: GuardedRequest,
    @Param() body: UpdateUserNameDto,
    @Res() res: Response,
  ) {
    const user = req.user;

    await this._commandBus.execute(
      new UpdateUserNameCommand(user.email, body.name),
    );

    res
      .status(HttpStatus.OK)
      .json(new MessageResponse('The name has been successfully changed.'));
  }
}
