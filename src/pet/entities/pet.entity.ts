import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { Usuarios } from "../../usuarios/usuarios.entidad";
import { Cat } from "../../cats/entities/cat.entity";

@Entity('Pet')
export class Pet {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt!: Date;

  @ManyToOne(() => Usuarios, user => user.pets)
  user!: Usuarios;

  @OneToOne(() => Cat, cat => cat.pet)
  cat!: Cat;
}
