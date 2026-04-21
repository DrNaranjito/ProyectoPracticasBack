import { isNumber, IsNumber, IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column , CreateDateColumn,UpdateDateColumn,DeleteDateColumn, ManyToOne} from "typeorm"; 
import { Breed } from "../../breed/entities/breed.entity";


@Entity('Cats')
export class Cat {

@PrimaryGeneratedColumn()
@IsNumber()
id!:number

@Column()
@IsString()
externalId!:string

@IsString()
@Column()
url!:string


@IsNumber()
@Column()
width!:number

@IsNumber()
@Column()
height!:number

 @CreateDateColumn({type : 'timestamptz'})
createdAt! : Date;

@UpdateDateColumn({type : 'timestamptz'})
updatedAt! : Date;

@DeleteDateColumn({type : 'timestamptz'})
deletedAt! : Date;


@IsNumber()
@Column()
breed! : number;
//Funciona como una foreign key de la tabla de breeds

@ManyToOne(() => Breed, (breed) => breed.id)
breed_id! : number;

//Función que dice que una raza la puede tener uno o muchos gatos.


}

