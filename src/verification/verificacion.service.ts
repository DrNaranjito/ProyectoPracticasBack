import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Verificacion } from './verificacion.entidad';
import { ActualizarVerificacionDto } from './dto/rechazarUsuario';
import { crearVerificacionDTO } from './dto/aceptarUsuario';



@Injectable()
export class ServiciosVerificacion {
  constructor(
    @InjectRepository(Verificacion)
    private readonly repositorioVerificacion: Repository<Verificacion>,
  ) { }

  crear(datosDTO: crearVerificacionDTO) {
    const verificacion = this.repositorioVerificacion.create(datosDTO);
    return this.repositorioVerificacion.save(verificacion);
  }

  todos() {
    return this.repositorioVerificacion.find(); //Es la misma sentencia en postgre solo que pasada a tsSELECT * FROM usuarios;
  }

  async buscarUno(id: number) {
    const verificacion = await this.repositorioVerificacion.findOne({ where: { id } })
    if (!verificacion) {
      throw new NotFoundException //Si no se encuentra al usuario lanza una excepcion
    }
    return verificacion
  }

  async update(id: number, dto: ActualizarVerificacionDto) {
    const user = await this.buscarUno(id);

    const updated = Object.assign(user, dto);

    return this.repositorioVerificacion.save(updated);


  }

  async remove(id: number) {
    const user = await this.buscarUno(id); //Se le asgina el id del usuario que se quiere borrar a la constante usuario para borrarlo
    return this.repositorioVerificacion.remove(user);
  }
}