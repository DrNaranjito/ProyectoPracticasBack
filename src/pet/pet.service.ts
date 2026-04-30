import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { Repository } from 'typeorm';
import { Cat } from '../cats/entities/cat.entity';

@Injectable()
export class ServiciosPet {

  constructor(
    @InjectRepository(Pet)
    private readonly repositorioPet: Repository<Pet>,

    @InjectRepository(Cat)
    private readonly repositorioCat: Repository<Cat>,
  ) { }
  /*Inyectamos lo necesario para poder usar las herramientas que nos
  van a permitir guardar, borrar y modificar los usuarios de la base de datos.
  */

  async adoptar(dto: CreatePetDto, userId: number) {
    const cat = await this.repositorioCat.findOne({
      where: { id: dto.catId },
      relations: ['pet'],
      //Declaramos que se va a referenciar por id el gato
    });

    if (!cat) throw new NotFoundException('El gato no existe');
    if (cat.pet) throw new BadRequestException('Este gato ya está adoptado');

    const pet = this.repositorioPet.create({
      name: dto.name,
      user: { id: userId },
      cat: { id: dto.catId },

      //Se crea applicandole el nombre que le pone el usuario y usando el id del gato y del usuario
    });

    const guardado = await this.repositorioPet.save(pet);

    return this.repositorioPet.findOne({
      where: { id: guardado.id },
      relations: ['user', 'cat'],
    });
  }


  async misMascotas(userId: number) {
    return this.repositorioPet.find({
      where: { user: { id: userId } },
      relations: ['cat'],
    });
  }

  async devolver(petId: number, userId: number) {
    const pet = await this.repositorioPet.findOne({
      where: { id: petId, user: { id: userId } },
      relations: ['cat'],
    });

    if (!pet) throw new NotFoundException('No tienes esta mascota');

    await this.repositorioPet.remove(pet);
  }

  async buscarUno(id: number) {
    const pet = await this.repositorioPet.findOne({ where: { id } })
    if (!pet) {
      throw new NotFoundException 
    }
    return pet
  }

  async update(id: number, dto: UpdatePetDto) {
    const pet = await this.buscarUno(id);

    const updated = Object.assign(pet, dto);

    return this.repositorioPet.save(updated);

  }

  async remove(id: number) {
    const pet = await this.buscarUno(id); //Se le asgina el id del usuario que se quiere borrar a la constante usuario para borrarlo
    return this.repositorioPet.remove(pet);
  }
}
