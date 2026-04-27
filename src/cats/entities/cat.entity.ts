
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToOne } from "typeorm";
import { Breed } from "../../breed/entities/breed.entity";
import { Pet } from "../../pet/entities/pet.entity";


@Entity('Cats')
export class Cat {

  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  externalId!: string

  @Column()
  url!: string

  @Column()
  width!: number

  @Column()
  height!: number

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt!: Date;

  //Funciona como una foreign key de la tabla de breeds

  @ManyToOne(() => Breed, breed => breed.cats)
  breed!: Breed; // ← RELACIÓN CORRECTA

  @OneToOne(() => Pet, pet => pet.cat, { nullable: true })
  pet!: Pet | null;

  //Función que dice que una raza la puede tener uno o muchos gatos.


}

