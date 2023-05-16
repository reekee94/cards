import {
  Body,
  Controller,
  HttpStatus,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
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
import { UpdateUserNameCommand } from './commands/impl/update-user-name.handler';
import { UpdateUserNameDto } from './dtos/updateUserName.dto';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Put('name')
  @ApiOkResponse({
    type: MessageResponse,
  })
  @ApiBadRequestResponse({
    schema: {
      oneOf: [
        {
          title: 'User not exists',
          description: 'First you need to create a user.',
          example: 'First you need to create a user.',
        },
      ],
    },
  })
  @ApiBearerAuth()
  async setUserName(
    @Req() req: GuardedRequest,
    @Body() body: UpdateUserNameDto,
    @Res() res: Response,
  ) {
    const bbid_user = req.user;

    await this._commandBus.execute(
      new UpdateUserNameCommand(bbid_user.email, body.name),
    );

    res
      .status(HttpStatus.OK)
      .json(new MessageResponse('The name has been successfully changed.'));
  }
}
