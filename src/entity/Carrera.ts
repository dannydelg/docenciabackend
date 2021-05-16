import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { MinLength, MaxLength } from 'class-validator';



@Entity()
@Unique(['sigla'])
export class Carrera {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @MinLength(6)  
    @MaxLength(12)  
    sigla: string;

    @Column()
    @MinLength(6)
    @MaxLength(60)
    nombre: string;
 



}
