import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, OneToOne } from "typeorm";
import { Pet } from "../pet/entities/pet.entity";
import { Verificacion } from "../verification/verificacion.entidad";
import { Exclude } from "class-transformer";
import { Role } from "../auth/Decorator/role.enum";

//ESTE FICHERO ES LA TABLA DEL DIAGRAMA RELACIONAL DE LA BASE DE DATOS.

@Entity('Usuarios') //Nombre de la tabla
export class Usuarios {

    @PrimaryGeneratedColumn() //Indicamos que va a ser la PrimaryKey de la tabla
    id!: number // La exclamación nos ahorra el tener que inicializar el dato ya que es una variable a la que se le va a asignar el dato más adelante
    //El id es como un serial
    @Column()
    mail!: string;


    @Column()
    name!: string;


    @Exclude()
    @Column()
    password!: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.sinValidar,
    })
    role!: Role;

    @Column({
        type: 'enum',
        enum: ['Español', 'Inglés'],
        default: 'Español',
    })
    language!: 'Español' | 'Inglés';

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt!: Date;

    @DeleteDateColumn({ type: 'timestamptz' })
    deletedAt!: Date;

    @OneToMany(() => Pet, pet => pet.user)
    pets!: Pet[];
    //En estas 3 ultimas filas he usado el tipo *timestamptz* ya que proporciona la fecha con zona horaria.

    @OneToOne(() => Verificacion, (verificacion) => verificacion.user)
    verificacion!: Verificacion;
}