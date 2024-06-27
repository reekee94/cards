import { Employee } from "../../entities/employee.entity";

export class CreateEmployeeCommand {
  constructor(
    public readonly employee: Employee,
  ) {}
}
