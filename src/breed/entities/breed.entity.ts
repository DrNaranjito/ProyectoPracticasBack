
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

    @Column({ nullable: true })
    temperament!: string;

    @Column({ nullable: true })
    origin!: string

    @Column({ nullable: true })
    description!: string

    @Column({ nullable: true })
    wikiUrl!: string

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt!: Date;

    @DeleteDateColumn({ type: 'timestamptz' })
    deletedAt!: Date;

    @Column({ type: 'int', default: 0 })
    child_friendly!: number;

    @Column({ type: 'int', default: 0 })
    dog_friendly!: number;

    @Column({ type: 'int', default: 0 })
    energy_level!: number;

    @Column({ type: 'int', default: 0 })
    intelligence!: number;

    @Column({ type: 'int', default: 0 })
    stranger_friendly!: number;

    @OneToMany(() => Cat, (cat) => cat.breed)
    cats!: Cat[];
    //En este caso como es la aprte N de la relación se tiene que guardar como un array
}
