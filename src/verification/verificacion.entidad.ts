import {
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn,
    ManyToOne,
} from 'typeorm';
import { Usuarios } from '../usuarios/usuarios.entidad';

@Entity('Verificacion')
export class Verificacion {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    verificationToken!: string;

    @Column()
    targetEmail!: string;

    @Column({ type: 'timestamptz', nullable: true })
    acceptedAt!: Date | null;

    @Column({ type: 'timestamptz', nullable: true })
    rejectedAt!: Date | null;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt!: Date;

    @DeleteDateColumn({ type: 'timestamptz' })
    deletedAt!: Date;

    @ManyToOne(() => Usuarios, (user) => user.verificar)
    user!: Usuarios;
}