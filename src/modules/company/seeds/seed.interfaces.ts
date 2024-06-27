import { ExchangeRateData } from "../commands/impl/create-exchange-rate.command";
import { Employee } from "../entities/employee.entity";
import { ExchangeRate } from "../entities/exchange-rate.entity";

export interface IFileParser {
    parseEmployees(content: string, rates: ExchangeRateData[]): Employee;
    parseRate(content: string): ExchangeRateData;
    parseSection(data: string): string[];
    splitFileByHeaders(filePath: string): ISectionList;
    findLatestRateBeforeDate(rates: ExchangeRate[], targetDateStr: string, currency: string): number
  }

  export interface ISectionList {
    'Rates': string, 
    'E-List': string
}

  