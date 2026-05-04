import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { crearUsuariosDto } from './dto/crearUsuarios.dto';
import { actualizarUsuariosDto } from './dto/actualizarUsuario.dto';
import { Usuarios } from './usuarios.entidad';
import { registerDto } from '../auth/dto/register.dto';
import { Role } from '../auth/Decorator/role.enum';

@Injectable()
export class ServiciosUsuario {
  constructor(
    @InjectRepository(Usuarios)
    private readonly repositorioUsuario: Repository<Usuarios>,
  ) { }
  /*Inyectamos lo necesario para poder usar las herramientas que nos
  van a permitir guardar, borrar y modificar los usuarios de la base de datos.
  */


  crear(datosDTO: crearUsuariosDto) {
    const usuario = this.repositorioUsuario.create(datosDTO); //CREATE.TABLE
    return this.repositorioUsuario.save(usuario);
  }
  /*Creación de usuarios recogiendo los datos de la clase crearUsuarios.dto */

  todos() {
    return this.repositorioUsuario.find(); //Es la misma sentencia en postgre solo que pasada a tsSELECT * FROM usuarios;
  }//SELECT FROM

  /*
  Metodo para que se desplieguen todos los usuarios.
  */

  async buscarUno(id: number) {
    const user = await this.repositorioUsuario.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundException //Si no se encuentra al usuario lanza una excepcion
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
    const user = await this.buscarUno(id); //Se le asgina el id del usuario que se quiere borrar a la constante usuario para borrarlo
    return this.repositorioUsuario.remove(user);
  }
  //----------------------------------------------------------------------------------

  //METODOS PARA AUTENTIFICAR
async crearDesdeAuth(dto: registerDto): Promise<Usuarios> {
    const usuario = this.repositorioUsuario.create({
        mail: dto.email,
        name: dto.name,
        password: dto.password,
        role: Role.sinValidar,
        language: 'Español',
    });
        /*He creado el metodo crearDesdeAuth ya que al intentar usar el metodo de crear usuarios no me ha dejado
    por que no eran los parametros validos asi que igualo los datos introducidos por el dto y le añado
    los dos parametros que faltan en el dto de auth
    */
    return await this.repositorioUsuario.save(usuario);
}

  async buscarPorEmail(email: string) {
    return this.repositorioUsuario.findOne({
      where: { mail: email },
    });



  }

  /*
  Metodo para elimnar un usuario mediante su id
  */
}