import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from "typeorm";
import { Pet } from "../pet/entities/pet.entity";

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


    @Column()
    password!: string;

    @Column({
        type: 'enum', // Marcamos esta columna para que tenga 3 tipos de posibles respuestas 
        enum: ['registrado', 'sinRegistrar', 'Admin'], //Enumeramos las 3 posibles respuestas
        default: 'sinRegistrar' // Y por ultimo asignamos un valor por defecto

        /*Se hace de esta manera ya que si fuese por typescript con ponerlo separado por barrar valdría
        *Pero para que la base de datos reconozca que solo se pueden esos x valores hay que señalar que es 
        *de ese tipo*/
    })
    role!: 'registrado' | 'sinRegistrar' | 'Admin';

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


}