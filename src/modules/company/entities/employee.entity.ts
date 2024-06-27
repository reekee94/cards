import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Department } from './department.entity';
import { Salary } from './salary.entity';
import { Donation } from './donation.entity';

@Entity()
export class Employee {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @ManyToOne(() => Department, department => department.employees)
  department: Department;

  @OneToMany(() => Salary, salary => salary.employee)
  salaries: Salary[];

  @OneToMany(() => Donation, donation => donation.employee)
  donations: Donation[];
}