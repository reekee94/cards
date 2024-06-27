import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { CreateExchangeRateCommand } from '../impl/create-exchange-rate.command';
// import { RateRepository } from '../../repositories/';
import { ExchangeRate } from '../../entities/exchange-rate.entity';

@CommandHandler(CreateExchangeRateCommand)
export class CreateRatesCommandHandler
  implements ICommandHandler<CreateExchangeRateCommand>
{
  constructor(
    private readonly dataSource: DataSource,
  ) // private readonly rateRepository: RateRepository
  {}

  async execute(command: CreateExchangeRateCommand): Promise<ExchangeRate> {
    return await this.dataSource.manager.transaction(async (qr) => {
      const rate = qr.create(ExchangeRate, {
        date: new Date(command.rate.date),
        sign: command.rate.sign,
        value: command.rate.value,
      });
      return await qr.save(rate);
    });
  }
}
