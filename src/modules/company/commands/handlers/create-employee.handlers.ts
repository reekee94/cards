import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { CreateEmployeeCommand } from '../impl/create-employee.command';
import { Department } from '../../entities/department.entity';
import { Employee } from '../../entities/employee.entity';
import { Salary } from '../../entities/salary.entity';
import { Donation } from '../../entities/donation.entity';

@CommandHandler(CreateEmployeeCommand)
export class CreateEmployeeCommandHandler
  implements ICommandHandler<CreateEmployeeCommand>
{
  constructor(private readonly dataSource: DataSource) {}

  async execute(command: CreateEmployeeCommand): Promise<Employee> {
    return await this.dataSource.manager.transaction(async (qr) => {
      let department = await qr.findOne(Department, {
        where: { id: command.employee.department.id },
      });
      if (!department) {
        department = qr.create(Department, {
          id: command.employee.department.id,
          name: command.employee.department.name,
        });
        await qr.save(department);
      }

      const employee = qr.create(Employee, {
        id: command.employee.id,
        name: command.employee.name,
        surname: command.employee.surname,
        department,
      });
      await qr.save(employee);

      for (const salary of command.employee.salaries) {
        const salaryEntity = qr.create(Salary, {
          id: salary.id,
          amount: salary.amount,
          date: new Date(salary.date),
          employee,
        });
        await qr.save(salaryEntity);
      }

      for (const donation of command.employee.donations) {
        const donationEntity = qr.create(Donation, {
          id: donation.id,
          amount: donation.amount,
          date: new Date(donation.date),
          currency: donation.currency,
          amountInUSD: donation?.amountInUSD,
          exchangeRate: donation?.exchangeRate,
          employee,
        });
        await qr.save(donationEntity);
      }

      return employee; // Return the newly created employee
    });
  }
}
