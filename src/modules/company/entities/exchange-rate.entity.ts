import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ExchangeRate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  sign: string;

  @Column()
  value: number;
}