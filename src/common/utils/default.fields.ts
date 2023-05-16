import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class DefaultFields {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamptz', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamptz', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
