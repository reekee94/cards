
import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { readFileSync } from 'fs';
import { join } from 'path';
import { CommandBus } from '@nestjs/cqrs';
import { CreateEmployeeCommand } from '../commands/impl/create-employee.command';
import { CreateExchangeRateCommand, ExchangeRateData } from '../commands/impl/create-exchange-rate.command';
import { ParserFactory } from './parser-factory';


@Injectable()
export class FileSeed {
  constructor(private readonly _commandBus: CommandBus) {}
  async plant(qr: QueryRunner) {
    const filePath = join(__dirname, '../../../../dump.txt');
    // 1. How to change the code to support different file versions
    // CHEACK FILE VERSION(by adding logic) AND USE DIFFEREN PARSER VERSION
    const parser = ParserFactory.createParser('v1');
    const sections = parser.splitFileByHeaders(filePath);

    const rates = parser.parseSection(sections['Rates']).map(rateText => parser.parseRate(rateText));
    const employees = parser.parseSection(sections['E-List']).map(empText => parser.parseEmployees(empText, rates));

    for (const rate of rates) {
      await this._commandBus.execute(new CreateExchangeRateCommand(rate));
    }

    for (const employee of employees) {
      await this._commandBus.execute(new CreateEmployeeCommand(employee));
    }
  }
}




