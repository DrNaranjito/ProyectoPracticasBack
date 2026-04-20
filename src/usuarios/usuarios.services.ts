import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { crearUsuariosDto } from './dto/crearUsuarios.dto'; 
import { actualizarUsuariosDto } from './dto/actualizarUsuario.dto';
import { Usuarios } from './usuarios.entidad';

@Injectable()
export class ServiciosUsuario {
      constructor( 
    @InjectRepository(Usuarios) 
    private readonly repositorioUsuario: Repository<Usuarios>,
  ) {}
  /*Inyectamos lo necesario para poder usar las herramientas que nos
  van a permitir guardar, borrar y modificar los usuarios de la base de datos.
  */


    crear(datosDTO: crearUsuariosDto) {
    const usuario = this.repositorioUsuario.create(datosDTO);
    return this.repositorioUsuario.save(usuario);
  }
  /*Creación de usuarios recogiendo los datos de la clase crearUsuarios.dto */

  todos(){
    return this.repositorioUsuario.find(); //Es la misma sentencia en postgre solo que pasada a tsSELECT * FROM usuarios;
  }

  /*
  Metodo para que se desplieguen todos los usuarios.
  */

  async buscarUno(id:number){
    const user = await this.repositorioUsuario.findOne({where:{id}})
    if (!user){
       throw new NotFoundException //Si no se encuentra al usuario
  }
  return user
}

/*
Metodo en el cual si se le pasa por parametro un id va a buscar el usuario en cuestion.
Si no hay ningun usuario con ese id se lanzará una excepción de que no se ha encontrado.
*/

  async update(id: number, dto: actualizarUsuariosDto) {
    const user = await this.buscarUno(id);

    const updated = Object.assign(user, dto);

    return this.repositorioUsuario.save(updated);

    
  }

/*
Metodo en el cual si se le pasa por parametro un numero de id y los datos actualizados por parametro
actualiza el objero con los datos nuevos y los guarda de nuevo en el usuario con el mismo id
*/

  async remove(id: number) {
    const user = await this.buscarUno(id);
    return this.repositorioUsuario.remove(user);
  }

/*
Metodo para elimnar un usuario mediante su id
*/
}