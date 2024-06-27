import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardController } from './company.controller';
// import { CardRepository } from './repositories/company.repository';
import { CardQueryHandlers } from './queries/handlers';
// import { Card } from './entities/company.entity';
import { FileSeed } from './seeds/dump-file.seed';
// import { CardType } from './entities/company_type.entity';
// import { CardTypeRepository } from './repositories/company_type.repository';
import { CardCommandHandlers } from './commands/handlers';
import { Department } from './entities/department.entity';
import { Salary } from './entities/salary.entity';
import { Employee } from './entities/employee.entity';
import { Donation } from './entities/donation.entity';
import { DepartmentRepository } from './repositories/department.repository';
import { DonationRepository } from './repositories/donation.repository';
import { EmployeeRepository } from './repositories/employee.repository';
import { SalaryRepository } from './repositories/salary.repository';
import { ExchangeRate } from './entities/exchange-rate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department, Salary, Employee, Donation, ExchangeRate]), CqrsModule],
  controllers: [CardController],
  providers: [
    DepartmentRepository,
    DonationRepository,
    EmployeeRepository,
    SalaryRepository,
    ...CardQueryHandlers,
    ...CardCommandHandlers,
    FileSeed,
  ],
  exports: [DepartmentRepository, FileSeed, DonationRepository, SalaryRepository, EmployeeRepository],
})
export class CompanyModule {}
