import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { AccessTokenGuard } from 'src/common/guards/access.guard';
import { SuccessResponseWithBody } from 'src/common/models/successResponseWithBody';
import { GuardedRequest } from 'src/common/models/models';
import { DefaultTeamDto } from '../teams/dtos/default-team.dto';
import { CounterRepository } from './repositories/counter.repository';
import { MessageResponse } from 'src/common/models/messageResponse';

import { CreateCounterDto } from './dtos/create-counter.dto';
import { UpdateCounterDto } from './dtos/update-update.dto';
import { CreateCounterCommand } from './commands/impl/create-counter.command';
import { UpdateCounterCommand } from './commands/impl/update-counter.command';
import { DeleteCounterCommand } from './commands/impl/delete-counter.command';


@Controller('counter')
@ApiTags('counter')
export class CountersController {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
    private readonly _counterRepo: CounterRepository,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Post(':teamId')
  @ApiBearerAuth()
  @ApiBody({ type: CreateCounterDto })
  @ApiOkResponse({ type: DefaultTeamDto })
  async createCounter(
    @Param('teamId') teamId: number,
    @Req() req: GuardedRequest,
    @Body() body: CreateCounterDto,
    @Res() res: Response,
  ) {
    const user = req.user;
    const { steps } = body;

    const counter = await this._commandBus.execute(
      new CreateCounterCommand(teamId, steps, user),
    );

    res.status(HttpStatus.OK).json(new SuccessResponseWithBody(counter));
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: DefaultTeamDto })
  async getCounter(@Param('id') id: number, @Res() res: Response) {
    const counter = await this._counterRepo.findOneById(id);

    if (!counter) {
      return res.status(HttpStatus.NOT_FOUND).json(new MessageResponse('Counter not found'));
    }

    res.status(HttpStatus.OK).json({
      id: counter.id,
      steps: counter.steps,
      teamId: counter.teamId,
    });
  }

  @UseGuards(AccessTokenGuard)
  @Put(':id')
  @ApiBearerAuth()
  @ApiBody({ type: UpdateCounterDto })
  @ApiOkResponse({ type: DefaultTeamDto })
  async updateCounter(
    @Param('id') id: number,
    @Req() req: GuardedRequest,
    @Body() body: UpdateCounterDto,
    @Res() res: Response,
  ) {
    const user = req.user;
    const { steps } = body;

    const counter = await this._commandBus.execute(
      new UpdateCounterCommand(id, user, steps),
    );

    res.status(HttpStatus.OK).json(new SuccessResponseWithBody(counter));
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: MessageResponse })
  async deleteCounter(
    @Param('id') id: number,
    @Req() req: GuardedRequest,
    @Res() res: Response,
  ) {
    const user = req.user;

    await this._commandBus.execute(new DeleteCounterCommand(id, user));

    res.status(HttpStatus.OK).json(new MessageResponse('Counter successfully deleted'));
  }
}
