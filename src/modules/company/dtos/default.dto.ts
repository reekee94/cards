import { Department } from '../entities/department.entity';
import { Employee } from '../entities/employee.entity';
import { Salary } from '../entities/salary.entity';
import { Donation } from '../entities/donation.entity';

export class EmployeeDto {
  id: number;
  name: string;
  surname: string;
  department: DepartmentDto;
  salaries: SalaryDto[];
  donations: DonationDto[];

  static fromEntity(entity: Employee) {
    const dto = new EmployeeDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.surname = entity.surname;
    dto.department = DepartmentDto.fromEntity(entity.department);
    dto.salaries = entity.salaries.map(SalaryDto.fromEntity);
    dto.donations = entity.donations.map(DonationDto.fromEntity);
    return dto;
  }
}

export class DepartmentDto {
  id: number;
  name: string;

  static fromEntity(entity: Department) {
    const dto = new DepartmentDto();
    dto.id = entity.id;
    dto.name = entity.name;
    return dto;
  }
}

export class SalaryDto {
  id: number;
  date: Date;
  amount: number;

  static fromEntity(entity: Salary) {
    const dto = new SalaryDto();
    dto.id = entity.id;
    dto.date = entity.date;
    dto.amount = entity.amount;
    return dto;
  }
}

export class DonationDto {
  id: number;
  date: Date;
  amount: number;
  currency: string;
  amountInUSD: number;

  static fromEntity(entity: Donation) {
    const dto = new DonationDto();
    dto.id = entity.id;
    dto.date = entity.date;
    dto.amount = entity.amount;
    dto.currency = entity.currency;
    dto.amountInUSD = entity.amountInUSD; // Calculate based on current or historical exchange rate if needed
    return dto;
  }
}