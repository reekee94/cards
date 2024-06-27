import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { Employee } from './employee.entity';

@Entity()
export class Donation {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column()
  date: Date;

  @Column({ default: 'USD' })
  currency: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  amountInUSD: number;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  exchangeRate: number;

  @ManyToOne(() => Employee, employee => employee.donations)
  employee: Employee;
}
