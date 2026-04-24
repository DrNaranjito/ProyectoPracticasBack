import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServiciosPet {

  constructor(
    @InjectRepository(Pet)
    private readonly repositorioPet: Repository<Pet>,
  ) { }
  /*Inyectamos lo necesario para poder usar las herramientas que nos
  van a permitir guardar, borrar y modificar los usuarios de la base de datos.
  */


  crear(datosDTO: CreatePetDto) {
    const pet = this.repositorioPet.create(datosDTO);
    return this.repositorioPet.save(pet);
  }
  /*Creación de usuarios recogiendo los datos de la clase crearUsuarios.dto */

  todos() {
    return this.repositorioPet.find(); //Es la misma sentencia en postgre solo que pasada a tsSELECT * FROM usuarios;
  }

  /*
  Metodo para que se desplieguen todos los usuarios.
  */

  async buscarUno(id: number) {
    const pet = await this.repositorioPet.findOne({ where: { id } })
    if (!pet) {
      throw new NotFoundException //Si no se encuentra al usuario lanza una excepcion
    }
    return pet
  }

  /*
  Metodo en el cual si se le pasa por parametro un id va a buscar el usuario en cuestion.
  Si no hay ningun usuario con ese id se lanzará una excepción de que no se ha encontrado.
  */

  async update(id: number, dto: UpdatePetDto) {
    const pet = await this.buscarUno(id);

    const updated = Object.assign(pet, dto);

    return this.repositorioPet.save(updated);


  }

  /*
  Metodo en el cual si se le pasa por parametro un numero de id y los datos actualizados por parametro
  actualiza el objero con los datos nuevos y los guarda de nuevo en el usuario con el mismo id
  */

  async remove(id: number) {
    const pet = await this.buscarUno(id); //Se le asgina el id del usuario que se quiere borrar a la constante usuario para borrarlo
    return this.repositorioPet.remove(pet);
  }
}
