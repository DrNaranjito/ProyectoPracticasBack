import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Verificacion } from './verificacion.entidad';
import { ActualizarVerificacionDto } from './dto/actualizarVerificacion.dto';
import { crearVerificacionDTO } from './dto/crearVerificacion.dto';



@Injectable()
export class ServiciosVerificacion {
  constructor(
    @InjectRepository(Verificacion)
    private readonly repositorioVerificacion: Repository<Verificacion>,
  ) { }
  /*Inyectamos lo necesario para poder usar las herramientas que nos
  van a permitir guardar, borrar y modificar los usuarios de la base de datos.
  */


  crear(datosDTO: crearVerificacionDTO) {
    const verificacion = this.repositorioVerificacion.create(datosDTO);
    return this.repositorioVerificacion.save(verificacion);
  }
  /*Creación de usuarios recogiendo los datos de la clase crearUsuarios.dto */

  todos() {
    return this.repositorioVerificacion.find(); //Es la misma sentencia en postgre solo que pasada a tsSELECT * FROM usuarios;
  }

  /*
  Metodo para que se desplieguen todos los usuarios.
  */

  async buscarUno(id: number) {
    const verificacion = await this.repositorioVerificacion.findOne({ where: { id } })
    if (!verificacion) {
      throw new NotFoundException //Si no se encuentra al usuario lanza una excepcion
    }
    return verificacion
  }

  /*
  Metodo en el cual si se le pasa por parametro un id va a buscar el usuario en cuestion.
  Si no hay ningun usuario con ese id se lanzará una excepción de que no se ha encontrado.
  */

  async update(id: number, dto: ActualizarVerificacionDto) {
    const user = await this.buscarUno(id);

    const updated = Object.assign(user, dto);

    return this.repositorioVerificacion.save(updated);


  }

  /*
  Metodo en el cual si se le pasa por parametro un numero de id y los datos actualizados por parametro
  actualiza el objero con los datos nuevos y los guarda de nuevo en el usuario con el mismo id
  */

  async remove(id: number) {
    const user = await this.buscarUno(id); //Se le asgina el id del usuario que se quiere borrar a la constante usuario para borrarlo
    return this.repositorioVerificacion.remove(user);
  }
}