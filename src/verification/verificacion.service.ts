import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Verificacion } from './verificacion.entidad';
import { Usuarios } from '../usuarios/usuarios.entidad';
import { Role } from '../auth/Decorator/role.enum';



@Injectable()
export class ServiciosVerificacion {
  constructor(

    @InjectRepository(Usuarios)
    private readonly repositorioUsuarios: Repository<Usuarios>,
    @InjectRepository(Verificacion)
    private readonly repositorioVerificacion: Repository<Verificacion>,
  ) { }

  async getPendingUsers() {
    return this.repositorioUsuarios.find({
      where: { role: Role.sinValidar },
      relations: ['verificacion'],
    });
  }

 async acceptUser(mail: string) {
    const user = await this.repositorioUsuarios.findOne({
      where: { mail },
      relations: ['verificacion'],
    });

    if (!user) throw new NotFoundException('Usuario no encontrado');
    if (user.role !== 'sinValidar')
      throw new BadRequestException('El usuario ya está validado');

    user.role = Role.Validado;
    user.verificacion.acceptedAt = new Date();

    await this.repositorioVerificacion.save(user.verificacion);
    return this.repositorioUsuarios.save(user);
  }


    async rejectUser(mail: string) {
    const user = await this.repositorioUsuarios.findOne({
      where: { mail },
      relations: ['verificacion'],
    });

    if (!user) throw new NotFoundException('Usuario no encontrado');
    if (user.role !== 'sinValidar')
      throw new BadRequestException('El usuario ya está validado');

    user.verificacion.rejectedAt = new Date();
    await this.repositorioVerificacion.remove(user.verificacion);

    await this.repositorioUsuarios.remove(user);

    return { message: 'Usuaruio eliminado.' };
  }
}