// Salary.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { Employee } from './employee.entity';

@Entity()
export class Salary {
  @PrimaryColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  date: Date;

  @ManyToOne(() => Employee, employee => employee.salaries)
  employee: Employee;
}