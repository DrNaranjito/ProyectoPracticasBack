import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Verificacion } from './verificacion.entidad';
import { Usuarios } from '../usuarios/usuarios.entidad';



@Injectable()
export class ServiciosVerificacion {
  constructor(

    @InjectRepository(Usuarios)
    private readonly repositorioUsuaruis: Repository<Usuarios>,
    @InjectRepository(Verificacion)
    private readonly repositorioVerificacion: Repository<Verificacion>,
  ) { }

  async getPendingUsers() {
    return this.repositorioUsuaruis.find({
      where: { role: 'sinValidar' },
      relations: ['verification'],
    });
  }

 async acceptUser(mail: string) {
    const user = await this.repositorioUsuaruis.findOne({
      where: { mail },
      relations: ['verification'],
    });

    if (!user) throw new NotFoundException('Usuario no encontrado');
    if (user.role !== 'sinValidar')
      throw new BadRequestException('El usuario ya está validado');

    user.role = 'validado';
    user.verificar.acceptedAt = new Date();

    await this.repositorioVerificacion.save(user.verificar);
    return this.repositorioUsuaruis.save(user);
  }


    async rejectUser(mail: string) {
    const user = await this.repositorioUsuaruis.findOne({
      where: { mail },
      relations: ['verification'],
    });

    if (!user) throw new NotFoundException('Usuario no encontrado');
    if (user.role !== 'sinValidar')
      throw new BadRequestException('El usuario ya está validado');

    user.verificar.rejectedAt = new Date();
    await this.repositorioVerificacion.save(user.verificar);

    await this.repositorioUsuaruis.remove(user);

    return { message: 'Usuaruio eliminado.' };
  }
}