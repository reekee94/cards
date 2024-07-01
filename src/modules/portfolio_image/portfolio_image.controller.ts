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
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { AccessTokenGuard } from 'src/common/guards/access.guard';
import { SuccessResponseWithBody } from 'src/common/models/successResponseWithBody';
import { GuardedRequest } from 'src/common/models/models';
import { CreatePortfolioImageDto } from './dtos/create-portfolio-image.dto';
import { CreatePortfolioImageCommand } from './commands/impl/create-portfolio-image.command';
import { DefaultPortfolioDto } from '../portfolio/dtos/default-portfolio.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { PortfolioImageRepository } from './repositories/portfolio_image.repository';
import { MessageResponse } from 'src/common/models/messageResponse';
import { DeletePortfolioImageCommand } from './commands/impl/delete-portfolio-image.command';
import { UpdatePortfolioImageCommand } from './commands/impl/update-portfolio-image.command';
import { UpdatePortfolioImageDto } from './dtos/update-portfolio-image.dto';


@Controller('portfolio-images')
@ApiTags('portfolio-images')
export class PortfolioImageController {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
    private readonly _portfolioImageRepo: PortfolioImageRepository,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Post(':portfolioId')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'portfolioId', type: Number })
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({ type: CreatePortfolioImageDto })
  @ApiOkResponse({ type: DefaultPortfolioDto })
  async createPortfolioImage(
    @Param('portfolioId') portfolioId: number,
    @Req() req: GuardedRequest,
    @Body() body: CreatePortfolioImageDto,
    @UploadedFile() file: MulterFile,
    @Res() res: Response,
  ) {
    const user = req.user;
    const { imageName, imageDescription } = body;

    const portfolioImage = await this._commandBus.execute(
      new CreatePortfolioImageCommand(portfolioId, file.buffer, imageName, imageDescription, user),
    );

    res.status(HttpStatus.OK).json(new SuccessResponseWithBody(portfolioImage));
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: DefaultPortfolioDto })
  async getPortfolioImage(@Param('id') id: number, @Res() res: Response) {
    const portfolioImage = await this._portfolioImageRepo.findOneById(id);

    if (!portfolioImage) {
      return res.status(HttpStatus.NOT_FOUND).json(new MessageResponse('Portfolio image not found'));
    }

    res.status(HttpStatus.OK).json({
      id: portfolioImage.id,
      name: portfolioImage.image_name,
      description: portfolioImage.image_description,
      data: `data:image/jpeg;base64,${portfolioImage.data.toString('base64')}`,
    });
  }

  @UseGuards(AccessTokenGuard)
  @Put(':id')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', type: Number })
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({ type: UpdatePortfolioImageDto })
  @ApiOkResponse({ type: DefaultPortfolioDto })
  async updatePortfolioImage(
    @Param('id') id: number,
    @Req() req: GuardedRequest,
    @Body() body: UpdatePortfolioImageDto,
    @UploadedFile() file: MulterFile,
    @Res() res: Response,
  ) {
    const user = req.user;
    const { ImageName: name, ImageDescription: description } = body;

    const portfolioImage = await this._commandBus.execute(
      new UpdatePortfolioImageCommand(id, user, file ? file.buffer : null, name, description),
    );

    res.status(HttpStatus.OK).json(new SuccessResponseWithBody(portfolioImage));
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: MessageResponse })
  async deletePortfolioImage(
    @Param('id') id: number,
    @Req() req: GuardedRequest,
    @Res() res: Response,
  ) {
    const user = req.user;

    await this._commandBus.execute(new DeletePortfolioImageCommand(id, user));

    res.status(HttpStatus.OK).json(new MessageResponse('Portfolio image successfully deleted'));
  }
}