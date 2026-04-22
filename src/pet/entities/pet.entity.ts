import { Column, CreateDateColumn, DeleteDateColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Usuarios } from "../../usuarios/usuarios.entidad";
import { Cat } from "../../cats/entities/cat.entity";

export class Pet {
    @PrimaryGeneratedColumn()
    id!:number

    @Column()
    name!:string

    @CreateDateColumn({type : 'timestamptz'})
    createdAt! : Date;
    
    @UpdateDateColumn({type : 'timestamptz'})
    updatedAt! : Date;
    
    @DeleteDateColumn({type : 'timestamptz'})
    deletedAt! : Date;

    @ManyToOne(() => Usuarios, usuarios => usuarios.Pet)
    usuarios!: Usuarios;

    @OneToOne(() => Cat, cat => cat.Pet)
    cat!: Cat;

}
