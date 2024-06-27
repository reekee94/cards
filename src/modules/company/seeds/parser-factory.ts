import { readFileSync } from "node:fs";
import { ExchangeRateData } from "../commands/impl/create-exchange-rate.command";
import { Employee } from "../entities/employee.entity";
import { IFileParser, ISectionList } from "./seed.interfaces";
import { ExchangeRate } from "../entities/exchange-rate.entity";
import { Department } from "../entities/department.entity";
import { Donation } from "../entities/donation.entity";
import { Salary } from "../entities/salary.entity";

export class ParserFactory {
  static createParser(fileVersion: string): IFileParser {
    switch (fileVersion) {
      case 'v1':
        return new FileParserV1();
      default:
        throw new Error('Unsupported file version');
    }
  }
}

class FileParserV1 implements IFileParser {
  
  public parseEmployees(employeeText: string, rates: ExchangeRateData[]) {
    const lines = employeeText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    const employee = new Employee();
    employee.salaries = [];
    employee.donations = [];
  
    let currentContext: Employee | Department | Donation | Salary  = employee;
  
    lines.forEach((line) => {
      if (line.startsWith('id:') && currentContext === employee) {
        employee.id = parseInt(line.split('id:')[1].trim());
      } else if (line.startsWith('name:') && currentContext === employee) {
        employee.name = line.split('name:')[1].trim();
      } else if (line.startsWith('surname:') && currentContext === employee) {
        employee.surname = line.split('surname:')[1].trim();
      } else if (line.startsWith('Department')) {
        employee.department = new Department();
        currentContext = employee.department;
      } else if (currentContext instanceof Department && line.startsWith('id:')) {
        const key = line.split(':')[0].trim();
        currentContext[key] = Number(line.split(':')[1].trim());
      } else if (
        currentContext instanceof Department &&
        line.startsWith('name:')
      ) {
        const key = line.split(':')[0].trim();
        currentContext[key] = line.split(':')[1].trim();
      } else if (line.startsWith('Salary')) {
        currentContext = employee; 
      } else if (line.startsWith('Statement')) {
        const salary = new Salary();
        employee.salaries.push(salary);
        currentContext = salary;
      } else if (line.startsWith('Donation')) {
        const donation = new Donation();
        employee.donations.push(donation);
        currentContext = donation;
      } else if (
        currentContext instanceof Salary &&
        (line.startsWith('id:') ||
          line.startsWith('amount:') ||
          line.startsWith('date:'))
      ) {
        if (line.startsWith('amount')) {
          currentContext.amount = Number(line.split('amount:')[1].trim());
        } else if (line.startsWith('date')) {
          currentContext.date = new Date(line.split('date:')[1].trim());
        } else {
          currentContext.id = parseInt(line.split('id:')[1].trim());
        }
      } else if (
        currentContext instanceof Donation &&
        (line.startsWith('id:') ||
          line.startsWith('date:') ||
          line.startsWith('amount:'))
      ) {
         if (line.startsWith('date')) {
          currentContext.date = new Date(line.split('date:')[1].trim());
        } else if (line.startsWith('amount')) {
          const parts = line.split('amount:')[1].trim().split(' ');
          const amount = parseFloat(parts[0]);
          const currency = parts[1];
          const date = currentContext.date.toISOString().split('T')[0]; // Assuming date has already been set
          const rate = this.findLatestRateBeforeDate(rates, date, currency);
          currentContext.amountInUSD = amount * rate; // Convert to USD
          currentContext.exchangeRate = rate;
          currentContext.amount = amount;
          currentContext.currency = currency;
        } else {
          currentContext.id = parseInt(line.split('id:')[1].trim());
        }
      }
    });
  
  
    return employee;
  }


  // ANSWER FOR SECOND QUESTION 
  // WE can Import an API service to fetch EXCHANGE RATES
  public parseRate(content: string): ExchangeRateData {
    const rateLines = content.split('\n').filter((line) => line.trim() !== '');
    let currentRate: any = {};
  
    for (const line of rateLines) {
      if (line.startsWith('Rate')) {
        if (currentRate.date && currentRate.sign && currentRate.value) {
          return currentRate;
        }
        currentRate = {};
      } else if (line.includes('date:')) {
        currentRate.date = new Date(line.split('date:')[1].trim());
      } else if (line.includes('sign:')) {
        currentRate.sign = line.split('sign:')[1].trim();
      } else if (line.includes('value:')) {
        currentRate.value = parseFloat(line.split('value:')[1].trim());
      }
    }
  
    return currentRate;
  }

  public parseSection(data: string): string[] {
    const doubleSpaceSlicer = data.split(/^ {2}(?! )/gm);
    return doubleSpaceSlicer.filter((section) => section.trim() !== '');
  }
  
  public splitFileByHeaders(filePath: string): ISectionList {
    const content = readFileSync(filePath, 'utf8');
    const headerRegex = /^(?!\s)[^\s].*$/gm;
  
    let sections: ISectionList = { 'Rates': '', 'E-List': ''};
    let currentHeader: keyof ISectionList | null = null;
    let currentContent: string[] = [];
  
    const lines = content.split('\n');
  
    lines.forEach((line, index) => {
      headerRegex.lastIndex = 0; // reset regex index
      if (headerRegex.test(line)) {
        const trimmedLine = line.trim() as keyof ISectionList;
        if (currentHeader !== null) {
          sections[currentHeader] = currentContent.join('\n');
          currentContent = [];
        }
        currentHeader = trimmedLine;
      } else {
        currentContent.push(line);
      }
  
      // Handle the last section at the end of the file
      if (index === lines.length - 1 && currentHeader !== null) {
        sections[currentHeader] = currentContent.join('\n').trim();
      }
    });
  
    return sections;
  }
  

  public findLatestRateBeforeDate(rates: ExchangeRateData[], targetDateStr: string, currency: string): number {
    const targetDate = new Date(targetDateStr);
  
    const filteredRates = rates
      .filter(rate => rate.sign === currency)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
    const latestRate = filteredRates.find(rate => new Date(rate.date) <= targetDate);
  
    return latestRate ? latestRate.value : 1;
  }

}
