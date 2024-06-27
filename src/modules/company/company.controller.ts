import {
  Controller,
  Get,
  HttpStatus,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import {
  ApiOkResponseWithArray,
  SuccessResponseWithBody,
} from 'src/common/models/successResponseWithBody';
import { GetEmployeeDonationReward } from './queries/impl/get-employee-donation-reward.query';
// import { DefaultCardDto } from './dtos/default.dto';
import { EmployeeDonationRewardDto } from './dtos/get-employee-donate-reward.dto';



@Controller('company')
@ApiTags('company')
export class CardController {
  constructor(
    private readonly _queryBus: QueryBus,
    // we can use also command buss
    // private readonly _commandBus: CommandBus,
  ) {}

  @Get()
  @ApiOkResponseWithArray(EmployeeDonationRewardDto)
  @ApiBearerAuth()
  async getDonationReward(@Res() res: Response) {
    const emloyeeRewards = await this._queryBus.execute(new GetEmployeeDonationReward());

    res.status(HttpStatus.OK).json(new SuccessResponseWithBody(emloyeeRewards));
  }

  // 3.In the future the client may want to import files via the web interface, how can the system be modified to allow this?
  // add an POST API route that can process file @UseInterceptors(FileInterceptor('file')) and Multer.

}
