export class CreateExchangeRateCommand {
  constructor(public readonly rate: ExchangeRateData) {}
}

export interface ExchangeRateData {
  date: Date;
  sign: string;
  value: number;
}