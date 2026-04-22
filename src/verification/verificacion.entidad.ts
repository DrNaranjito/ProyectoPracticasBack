import { Entity, PrimaryGeneratedColumn, Column , CreateDateColumn,UpdateDateColumn,DeleteDateColumn} from "typeorm"; 

//ESTE FICHERO ES LA TABLA DEL DIAGRAMA RELACIONAL DE LA BASE DE DATOS.

@Entity('Verificacion') //Nombre de la tabla
export class Vereficacion{

    @PrimaryGeneratedColumn() //Indicamos que va a ser la PrimaryKey de la tabla
    id!:number // La exclamación nos ahorra el tener que inicializar el dato ya que es una variable a la que se le va a asignar el dato más adelante
     //El id es como un serial
    @Column()
    targetEmail!: string;

    @Column()
    verificationToken!: boolean;

    @Column()
    name!: string;

    @Column()
    password!: string;

    @Column({
        type: 'enum',
        enum : ['Español', 'Inglés'],
        default : 'Español',
    })
    language! : 'Español' | 'Inglés';

    @CreateDateColumn({type : 'timestamptz'})
    acceptedAt! : Date;

    @CreateDateColumn({type : 'timestamptz'})
    createdAt! : Date;

    @UpdateDateColumn({type : 'timestamptz'})
    updatedAt! : Date;

    @DeleteDateColumn({type : 'timestamptz'})
    deletedAt! : Date;

    //En estas 3 ultimas filas he usado el tipo *timestamptz* ya que proporciona la fecha con zona horaria.


}