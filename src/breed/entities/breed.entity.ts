import { IsNumber, IsString } from "class-validator";
import { CreateDateColumn, DeleteDateColumn, OneToMany, UpdateDateColumn } from "typeorm";
import { Cat } from "../../cats/entities/cat.entity";

export class Breed {

    @IsNumber()
    id!:number;

    @IsString()
    externalId!:string

    @IsString()
    name!:string

    @IsString()
    temperament!:string

    @IsString()
    origin!:string

     @IsString()
    description!:string

    @IsString()
    wikiUrl!:string

    @CreateDateColumn({type : 'timestamptz'})
        createdAt! : Date;
    
    @UpdateDateColumn({type : 'timestamptz'})
        updatedAt! : Date;
    
    @DeleteDateColumn({type : 'timestamptz'})
        deletedAt! : Date;

    @OneToMany(() => Cat,(cat) => cat.id)
    cat_id! : number;
}
