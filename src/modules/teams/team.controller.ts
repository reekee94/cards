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
import {
  SuccessResponseWithBody,
} from 'src/common/models/successResponseWithBody';
import { GuardedRequest } from 'src/common/models/models';
import { MessageResponse } from '../../common/models/messageResponse';
import { GetTeamsListQuery } from './queries/impl/get-team-list.query';
import { GetTeamByIdQuery } from './queries/impl/get-team-by-id.query';
import { CreateTeamDto } from './dtos/create-team.dto';
import { CreateTeamCommand } from './commands/impl/create-portfolio.command';
import { UpdateTeamDto } from './dtos/update-team.dto';
import { UpdateTeamCommand } from './commands/impl/update-team.command';
import { DeleteTeamCommand } from './commands/impl/delete-team.command';

@Controller('team')
@ApiTags('team')
export class TeamController {
  constructor(
    private readonly _queryBus: QueryBus,
    private readonly _commandBus: CommandBus,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  @ApiOkResponse({ type: [CreateTeamDto] })
  @ApiBearerAuth()
  async getAll(@Res() res: Response) {
    const teams = await this._queryBus.execute(
      new GetTeamsListQuery(), // Replace with your team query
    );
    res.status(HttpStatus.OK).json(new SuccessResponseWithBody(teams));
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: CreateTeamDto })
  @ApiBearerAuth()
  async getTeamById(@Param() param: { id: number }, @Res() res: Response) {
    const { id } = param;

    const team = await this._queryBus.execute(
      new GetTeamByIdQuery(id), // Replace with your team query
    );

    res.status(HttpStatus.OK).json(new SuccessResponseWithBody(team));
  }

  @UseGuards(AccessTokenGuard)
  @Post()
  @ApiOkResponse({ type: CreateTeamDto })
  @ApiBody({ type: CreateTeamDto })
  @ApiBearerAuth()
  async createTeam(
    @Req() req: GuardedRequest,
    @Body() body: CreateTeamDto,
    @Res() res: Response,
  ) {
    const owner = req.user;
    const { name, description } = body;

    const team = await this._commandBus.execute(
      //@ts-ignore
      new CreateTeamCommand(name, owner, description),
    );

    res.status(HttpStatus.OK).json(new SuccessResponseWithBody(team));
  }

  @UseGuards(AccessTokenGuard)
  @Put(':id')
  @ApiOkResponse({ type: MessageResponse })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateTeamDto })
  @ApiBearerAuth()
  async updateTeam(
    @Req() req: GuardedRequest,
    @Param() param: { id: number },
    @Body() body: UpdateTeamDto,
    @Res() res: Response,
  ) {
    const ownerId: number = req.user.id;
    const { name, description } = body;
    const { id } = param;

  
    await this._commandBus.execute(
      //@ts-ignore
      new UpdateTeamCommand(id, name, ownerId, description),
    );

    res
      .status(HttpStatus.OK)
      .json(new MessageResponse('The team was successfully updated.'));
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  @ApiOkResponse({ type: MessageResponse })
  @ApiParam({ name: 'id', type: Number })
  @ApiBearerAuth()
  async deleteTeam(
    @Req() req: GuardedRequest,
    @Param() param: { id: number },
    @Res() res: Response,
  ) {
    const ownerId = req.user.id;
    const { id } = param;

    await this._commandBus.execute(new DeleteTeamCommand(id, ownerId));

    res
      .status(HttpStatus.OK)
      .json(new MessageResponse('The team was successfully deleted.'));
  }
}
