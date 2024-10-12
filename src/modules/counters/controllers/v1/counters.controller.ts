import { Controller, Post, Param, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { CounterService } from '../../service/counter.service';

@Controller('steps')
export class CounterController {
  constructor(private readonly stepsService: CounterService) {}

  @Post(':userId')
  addSteps(
    @Param('userId') userId: number,
    @Body() { steps }: { steps: number; },
    @Res() res: Response,
  ) {
    this.stepsService.addSteps(userId, steps);
    return res.status(200).json({ message: 'Steps added successfully' });
  }
}