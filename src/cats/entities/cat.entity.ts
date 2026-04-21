import { IsNumber, IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column , CreateDateColumn,UpdateDateColumn,DeleteDateColumn} from "typeorm"; 


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

@IsString()
@Column()
breed!:string
//Columna para enlazarla
}

