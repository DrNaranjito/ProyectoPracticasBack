import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Usuarios } from '../usuarios/usuarios.entidad';
import { Role } from '../auth/Decorator/role.enum';

@Injectable()
export class SeedService implements OnModuleInit {

  constructor(
    @InjectRepository(Usuarios)
    private readonly usuariosRepository: Repository<Usuarios>,
  ) {}

  async onModuleInit() {
    await this.createAdminUser();
  }

  private async createAdminUser() {
    const admin = await this.usuariosRepository.findOne({
      where: { mail: process.env.ADMIN_EMAIL },
    });

    if (admin) return;

    const newAdmin = this.usuariosRepository.create({
      name: process.env.ADMIN_NAME,
      mail: process.env.ADMIN_EMAIL,
      password: await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10),
      role: process.env.ADMIN_ROLE as Role,
    });

    await this.usuariosRepository.save(newAdmin);

    console.log('Usuario administrador creado automáticamente');
  }
}
