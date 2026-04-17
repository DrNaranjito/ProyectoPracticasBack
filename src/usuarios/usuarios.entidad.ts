import { Entity, PrimaryGeneratedColumn, Column , CreateDateColumn,UpdateDateColumn,DeleteDateColumn} from "typeorm"; 

//ESTE FICHERO ES LA TABLA DEL DIAGRAMA RELACIONAL DE LA BASE DE DATOS.

Entity('Usuarios') //Nombre de la tabla
export class Usuarios{

    @PrimaryGeneratedColumn() //Indicamos que va a ser la PrimaryKey de la tabla
    id!:number // La exclamación nos ahorra el tener que inicializar el dato ya que es una variable a la que se le va a asignar el dato más adelante

    @Column()
    mail!: string;

    @Column()
    name!: string;

    @Column()
    password!: string;

}