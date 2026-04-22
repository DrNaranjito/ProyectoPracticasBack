import {
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn ,UpdateDateColumn, DeleteDateColumn,
} from 'typeorm';

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

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt!: Date;

    @DeleteDateColumn({ type: 'timestamptz' })
    deletedAt!: Date;
}