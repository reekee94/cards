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
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { AccessTokenGuard } from 'src/common/guards/access.guard';
import {
  ApiOkResponseWithArray,
  SuccessResponseWithBody,
} from 'src/common/models/successResponseWithBody';
import { GetPortfoliosListQuery } from './queries/impl/get-portfolio-list.query';
import { GetPortfolioByIdQuery } from './queries/impl/get-portfolio-by-id.query';
import { DefaultPortfolioDto } from './dtos/default-portfolio.dto';
import { MessageResponse } from 'src/common/models/messageResponse';
import { CreatePortfolioDto } from './dtos/create-portfolio.dto';
import { GuardedRequest } from 'src/common/models/models';
import { CreatePortfolioCommand } from './commands/impl/create-portfolio.command';
import { UpdatePortfolioCommand } from './commands/impl/update-portfolio.command';
import { DeletePortfolioCommand } from './commands/impl/delete-portfolio.command';
import { UpdateUserNameDto } from './dtos/updateUserName.dto';

@Controller('portfolios')
@ApiTags('portfolios')
export class PortfolioController {
  constructor(
    private readonly _queryBus: QueryBus,
    private readonly _commandBus: CommandBus,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  @ApiOkResponseWithArray(DefaultPortfolioDto)
  @ApiBearerAuth()
  async getAll(@Res() res: Response) {
    const portfolios = await this._queryBus.execute(
      new GetPortfoliosListQuery(),
    );

    res.status(HttpStatus.OK).json(new SuccessResponseWithBody(portfolios));
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: DefaultPortfolioDto })
  @ApiBearerAuth()
  async getPortfolioById(@Param() param: { id: number }, @Res() res: Response) {
    const { id } = param;

    const portfolio = await this._queryBus.execute(
      new GetPortfolioByIdQuery(id),
    );

    res.status(HttpStatus.OK).json(new SuccessResponseWithBody(portfolio));
  }

  @UseGuards(AccessTokenGuard)
  @Post()
  @ApiOkResponse({
    type: DefaultPortfolioDto,
  })
  @ApiBody({
    type: CreatePortfolioDto,
    examples: {
      exp: {
        value: {
          name: 'test',
          description: 'Sample description',
        },
      },
    },
  })
  @ApiBearerAuth()
  async createPortfolio(
    @Req() req: GuardedRequest,
    @Body() body: CreatePortfolioDto,
    @Res() res: Response,
  ) {
    const owner = req.user;
    const { name, description } = body;

    const portfolio = await this._commandBus.execute(
      new CreatePortfolioCommand(name, owner, description),
    );

    res.status(HttpStatus.OK).json(new SuccessResponseWithBody(portfolio));
  }

  @UseGuards(AccessTokenGuard)
  @Put(':id')
  @ApiOkResponse({
    type: MessageResponse,
  })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({
    type: CreatePortfolioDto,
    examples: {
      exp: {
        value: {
          name: 'test',
          description: 'Updated description',
        },
      },
    },
  })
  @ApiBearerAuth()
  async updatePortfolio(
    @Req() req: GuardedRequest,
    @Param() param: { id: number },
    @Body() body: CreatePortfolioDto,
    @Res() res: Response,
  ) {
    const ownerId = req.user.id;
    const { name, description } = body;
    const { id } = param;

    await this._commandBus.execute(
      new UpdatePortfolioCommand(id, name, ownerId, description),
    );

    res
      .status(HttpStatus.OK)
      .json(new MessageResponse('The portfolio was successfully updated.'));
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  @ApiOkResponse({
    type: MessageResponse,
  })
  @ApiParam({ name: 'id', type: Number })
  @ApiBearerAuth()
  async deletePortfolio(
    @Req() req: GuardedRequest,
    @Param() param: { id: number },
    @Res() res: Response,
  ) {
    const ownerId = req.user.id;
    const { id } = param;

    await this._commandBus.execute(new DeletePortfolioCommand(id, ownerId));

    res
      .status(HttpStatus.OK)
      .json(new MessageResponse('The portfolio was successfully deleted.'));
  }

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
    const user = req.user;

    // await this._commandBus.execute(
    //   new UpdateUserNameCommand(user.email, body.name),
    // );

    
    res
      .status(HttpStatus.OK)
      .json(new MessageResponse('The name has been successfully changed.'));
  }
}
