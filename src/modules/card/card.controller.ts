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
  ApiOkResponseWithArray,
  SuccessResponseWithBody,
} from 'src/common/models/successResponseWithBody';
import { GetCardsListQuery } from './queries/impl/get-cards-list.query';
import { GetCardByIdQuery } from './queries/impl/get-card-by-id.query';
import { DefaultCardDto } from './dtos/defaultCard.dto';
import { MessageResponse } from 'src/common/models/messageResponse';
import { CreateCardDto } from './dtos/createCard.dto';
import { GuardedRequest } from 'src/common/models/models';
import { CreateCardCommand } from './commands/impl/create-card.command';
import { UpdateCardCommand } from './commands/impl/update-card.command';
import { DeleteCardCommand } from './commands/impl/delete-card.command';

@Controller('cards')
@ApiTags('cards')
export class CardController {
  constructor(
    private readonly _queryBus: QueryBus,
    private readonly _commandBus: CommandBus,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  @ApiOkResponseWithArray(DefaultCardDto)
  @ApiBearerAuth()
  async getAll(@Res() res: Response) {
    const cards = await this._queryBus.execute(new GetCardsListQuery());

    res.status(HttpStatus.OK).json(new SuccessResponseWithBody(cards));
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: DefaultCardDto })
  @ApiBearerAuth()
  async register(@Param() param: { id: number }, @Res() res: Response) {
    const { id } = param;

    const card = await this._queryBus.execute(new GetCardByIdQuery(id));

    res.status(HttpStatus.OK).json(new SuccessResponseWithBody(card));
  }

  @UseGuards(AccessTokenGuard)
  @Post()
  @ApiOkResponse({
    type: DefaultCardDto,
  })
  @ApiBody({
    type: CreateCardDto,
    examples: {
      exp: {
        value: {
          name: 'test',
          cardType: 'Gold',
        },
      },
    },
  })
  @ApiBearerAuth()
  async createCard(
    @Req() req: GuardedRequest,
    @Body() body: CreateCardDto,
    @Res() res: Response,
  ) {
    const owner = req.user;
    const { name, cardType } = body;

    const card = await this._commandBus.execute(
      new CreateCardCommand(name, owner, cardType),
    );

    res.status(HttpStatus.OK).json(new SuccessResponseWithBody(card));
  }

  @UseGuards(AccessTokenGuard)
  @Put(':id')
  @ApiOkResponse({
    type: MessageResponse,
  })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({
    type: CreateCardDto,
    examples: {
      exp: {
        value: {
          name: 'test',
          cardType: 'Gold',
        },
      },
    },
  })
  @ApiBearerAuth()
  async updateCard(
    @Req() req: GuardedRequest,
    @Param() param: { id: number },
    @Body() body: CreateCardDto,
    @Res() res: Response,
  ) {
    const ownerId = req.user.id;
    const { name, cardType } = body;
    const { id } = param;

    await this._commandBus.execute(
      new UpdateCardCommand(id, name, ownerId, cardType),
    );

    res
      .status(HttpStatus.OK)
      .json(new MessageResponse('The card was successfully updated.'));
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  @ApiOkResponse({
    type: MessageResponse,
  })
  @ApiParam({ name: 'id', type: Number })
  @ApiBearerAuth()
  async deleteCard(
    @Req() req: GuardedRequest,
    @Param() param: { id: number },
    @Res() res: Response,
  ) {
    const ownerId = req.user.id;
    const { id } = param;

    await this._commandBus.execute(new DeleteCardCommand(id, ownerId));

    res
      .status(HttpStatus.OK)
      .json(new MessageResponse('The card was successfully deleted.'));
  }
}
