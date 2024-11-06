// src/entities/Admin.ts
import { Entity, PrimaryGeneratedColumn, Column, Long } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  fname: string;

  @Column({ type: 'varchar' })
  lname: string;

  @Column({ type: 'bigint' })
  number: Long;

  @Column({type: 'date', nullable: true })
  Dob: Date;

}
