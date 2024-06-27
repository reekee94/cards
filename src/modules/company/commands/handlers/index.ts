import { CreateEmployeeCommandHandler } from './create-employee.handlers';
import { CreateRatesCommandHandler } from './create-exchange-rate.handlers';

export const CardCommandHandlers = [
  CreateEmployeeCommandHandler,
  CreateRatesCommandHandler,
];
