
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Cat } from "../../cats/entities/cat.entity";

@Entity('Breed')
export class Breed {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    externalId!: string

    @Column()
    name!: string

    @Column()
    temperament!: string

    @Column()
    origin!: string

    @Column()
    description!: string

    @Column()
    wikiUrl!: string

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt!: Date;

    @DeleteDateColumn({ type: 'timestamptz' })
    deletedAt!: Date;

    @OneToMany(() => Cat, (cat) => cat.breed)
    cats!: Cat[];
    //En este caso como es la aprte N de la relación se tiene que guardar como un array
}
