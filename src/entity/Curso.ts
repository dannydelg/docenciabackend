import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { MinLength, MaxLength } from 'class-validator';



@Entity()

export class Curso {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    
    sigla: string;

    @Column()

    nombre: string;

    @Column()
    @MaxLength(3)
    carreraId: number;

  
 



}
