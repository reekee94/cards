import { Controller, Post, Param, Body, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { CounterService } from '../../service/counter.service';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../../../common/guards/access.guard';

@ApiTags('steps')
@Controller('steps')
export class CounterController {
  constructor(private readonly stepsService: CounterService) {}

  @UseGuards(AccessTokenGuard)
  @Post(':userId')
  @ApiOperation({ summary: 'Add steps for a user' })
  @ApiParam({
    name: 'userId',
    type: Number,
    description: 'ID of the user to whom steps are being added',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        steps: {
          type: 'number',
          example: 5000,
        },
      },
      required: ['steps'],
    },
    description: 'Number of steps to add for the user',
  })
  @ApiResponse({
    status: 200,
    description: 'Steps added successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Steps added successfully' },
      },
    },
  })
  addSteps(
    @Param('userId') userId: number,
    @Body() { steps }: { steps: number },
    @Res() res: Response,
  ) {
    this.stepsService.addSteps(Number(userId), steps);
    return res.status(200).json({ message: 'Steps added successfully' });
  }

  @UseGuards(AccessTokenGuard)
  @Post(':userId/reset')
  @ApiOperation({ summary: 'Reset user steps to 0' })
  @ApiParam({
    name: 'userId',
    type: Number,
    description: 'ID of the user whose steps will be reset',
  })
  @ApiResponse({
    status: 200,
    description: 'User steps reset successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'User steps reset successfully' },
      },
    },
  })
  async resetUserSteps(
    @Param('userId') userId: number,
    @Res() res: Response,
  ) {
    await this.stepsService.refreshUserSteps(Number(userId));
    return res.status(200).json({ message: 'User steps reset successfully' });
  }
}
