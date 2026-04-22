
import { Entity, PrimaryGeneratedColumn, Column , CreateDateColumn,UpdateDateColumn,DeleteDateColumn, ManyToOne, OneToMany, OneToOne} from "typeorm"; 
import { Breed } from "../../breed/entities/breed.entity";
import { Pet } from "../../pet/entities/pet.entity";


@Entity('Cats')
export class Cat {

@PrimaryGeneratedColumn()

id!:number

@Column()
externalId!:string


@Column()
url!:string



@Column()
width!:number


@Column()
height!:number

 @CreateDateColumn({type : 'timestamptz'})
createdAt! : Date;

@UpdateDateColumn({type : 'timestamptz'})
updatedAt! : Date;

@DeleteDateColumn({type : 'timestamptz'})
deletedAt! : Date;

//Funciona como una foreign key de la tabla de breeds

  @ManyToOne(() => Breed, breed => breed.cats)
  breed!: Breed;
//Función que dice que una raza la puede tener uno o muchos gatos.

  @OneToOne(() => Pet,(pet) => pet.usuarios)
  Pet! : Pet;

  //un gato solo puede pertenecer a un usuario por eso la relación es de OneToOne
}

