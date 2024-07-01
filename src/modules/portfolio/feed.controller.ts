import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
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
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import {
  ApiOkResponseWithArray,
  SuccessResponseWithBody,
} from 'src/common/models/successResponseWithBody';
import { GetFeedQuery } from './queries/impl/get-feed.query';
import { FeedResponseDto } from './dtos/feedResponse.dto';
import { PaginationDto } from './dtos/pagination.dto';

@Controller('feed')
@ApiTags('feed')
export class FeedController {
  constructor(private readonly _queryBus: QueryBus) {}

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ type: [FeedResponseDto] })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'direction', required: false, type: String })
  async getFeed(
    @Query() paginationDto: PaginationDto,
    @Res() res: Response,
  ) {
    const { page = 1, limit = 10, direction = 'DESC' } = paginationDto;
    const feed = await this._queryBus.execute(
      new GetFeedQuery(page, limit, direction),
    );

    res.status(HttpStatus.OK).json(new SuccessResponseWithBody(feed));
  }
}