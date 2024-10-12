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
import { MessageResponse } from '../../common/models/messageResponse';
import { GetTeamsListQuery } from './queries/impl/get-team-list.query';
import { GetTeamByIdQuery } from './queries/impl/get-team-by-id.query';
import { CreateTeamDto } from './dtos/create-team.dto';
import { UpdateTeamDto } from './dtos/update-team.dto';
import { UpdateTeamCommand } from './commands/impl/update-team.command';
import { DeleteTeamCommand } from './commands/impl/delete-team.command';
import { CreateTeamCommand } from './commands/impl/create-portfolio.command';
import { CounterService } from '../counters/service/counter.service';
import { TeamCountersResponseDto } from './dtos/team-counter.dto';
import { TeamTotalStepsDto } from './dtos/team-total-counter.dto';

@Controller('team')
@ApiTags('team')
export class TeamController {
  constructor(
    private readonly _queryBus: QueryBus,
    private readonly _commandBus: CommandBus,
    private readonly counterService: CounterService
  ) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  @ApiOkResponse({ type: [CreateTeamDto] })
  @ApiBearerAuth()
  async getAll(@Res() res: Response) {
    const teams = await this._queryBus.execute(new GetTeamsListQuery());
    res.status(HttpStatus.OK).json(new SuccessResponseWithBody(teams));
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: CreateTeamDto })
  @ApiBearerAuth()
  async getTeamById(@Param('id') id: number, @Res() res: Response) {
    const team = await this._queryBus.execute(new GetTeamByIdQuery(id));
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
    const userId = req?.user.id;
    const { name, description } = body;

    const team = await this._commandBus.execute(
      new CreateTeamCommand(name, description, userId),
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
    @Param('id') id: number,
    @Body() body: UpdateTeamDto,
    @Res() res: Response,
  ) {
    const userId = req.user.id;
    const { name, description } = body;

    await this._commandBus.execute(
      new UpdateTeamCommand(id, name, description, userId),
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
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    const ownerId = req.user.id;

    await this._commandBus.execute(new DeleteTeamCommand(id, ownerId));

    res
      .status(HttpStatus.OK)
      .json(new MessageResponse('The team was successfully deleted.'));
  }

  @UseGuards(AccessTokenGuard)
  @Get(':teamId/counters')
  @ApiOkResponse({ type: TeamCountersResponseDto })
  @ApiParam({ name: 'teamId', type: Number })
  @ApiBearerAuth()
  async listTeamCounters(@Param('teamId') teamId: number, @Res() res: Response) {
    const counters = await this.counterService.listTeamMembersWithSteps(teamId);
    res.status(HttpStatus.OK).json(new SuccessResponseWithBody(counters));
  }

  @UseGuards(AccessTokenGuard)
  @Get(':teamId/total-steps')
  @ApiOkResponse({ type: TeamTotalStepsDto })
  @ApiParam({ name: 'teamId', type: Number })
  @ApiBearerAuth()
  async getTeamTotalSteps(@Param('teamId') teamId: number, @Res() res: Response) {
    const totalSteps = await this.counterService.getTeamTotalSteps(teamId);
    res.status(HttpStatus.OK).json(new SuccessResponseWithBody(totalSteps));
  }
}
