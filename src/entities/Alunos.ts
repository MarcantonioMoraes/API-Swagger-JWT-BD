import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,  UpdateDateColumn } from "typeorm";

@Entity("alunos")
export class Aluno {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  curso: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}