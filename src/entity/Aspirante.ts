import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { MinLength, IsNotEmpty, IsEmail } from 'class-validator';
import * as bcrypt from 'bcryptjs';



@Entity()
@Unique(['email'])
export class Aspirante {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @MinLength(6)
    @IsEmail()
    email: string;

    @Column()
    @MinLength(2)
    nombre: string;

    @Column()
    curriculum: string;

 /*    @Column()
    @MinLength(3)
    apellido1: string;

    @Column()
    @MinLength(3)
    apellido2: string; */

   

   /*  @Column()
    @MinLength(6)
    password: string;

    @Column()
    @IsNotEmpty()
    role: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updateAt: Date;

    hashPassword(): void {

        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password);

    }

    checkPassword(pass: string): boolean {
        return bcrypt.compareSync(pass, this.password);
    }
 */



}
