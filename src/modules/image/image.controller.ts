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


@Controller('image')
@ApiTags('image')
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
