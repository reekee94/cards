import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUserQuery } from './queries/impl/get-user.query';
import { MessageResponse } from 'src/common/models/messageResponse';
import { CreateUserDto } from './dtos/createUser.dto';
import { AddUserCommand } from './commands/impl/add-user.handler';
import { DefaultUserDto } from './dtos/defaultUser.dto';

@Controller('api/v1')
@ApiTags('users')
export class UserController {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {}

  // POST: Add a new user
  @Post('add-user')
  @ApiOkResponse({
    type: MessageResponse,
    description: 'User successfully created.',
  })
  @ApiBadRequestResponse({
    schema: {
      oneOf: [
        {
          title: 'Bad Request',
          description: 'Invalid user data.',
          example: 'Invalid user data.',
        },
      ],
    },
  })
  async addBasicUser(
    @Body() body: CreateUserDto,
    @Res() res: Response,
  ) {
    // Execute the command to create a new user
    await this._commandBus.execute(
      new AddUserCommand(body.email, body.name, body.password),
    );

    // Log user creation
    console.log(`User created: ${JSON.stringify(body)}`);

    res.status(HttpStatus.CREATED).json(new MessageResponse('User successfully created.'));
  }

  @Get('get-user/:id')
  @ApiOkResponse({
    type: DefaultUserDto,
    description: 'User successfully retrieved.',
  })
  @ApiBadRequestResponse({
    schema: {
      oneOf: [
        {
          title: 'User not found',
          description: 'No user found with the given ID.',
          example: 'No user found with the given ID.',
        },
      ],
    },
  })
  async getUser(
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    // Execute the query to retrieve the user by ID
    const user = await this._queryBus.execute(
      new GetUserQuery(id),
    );

    if (!user) {
      res.status(HttpStatus.BAD_REQUEST).json(new MessageResponse('No user found with the given ID.'));
    } else {
      res.status(HttpStatus.OK).json(user);
    }
  }
}
