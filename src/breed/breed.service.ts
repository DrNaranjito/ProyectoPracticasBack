import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { Breed } from './entities/breed.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BreedService {

  constructor(
@InjectRepository(Breed)
private readonly catRepository:Repository<Breed>
  
  ){ }

    create(datosDTO: CreateBreedDto) {
    const usuario = this.catRepository.create(datosDTO);
    return this.catRepository.save(usuario);
  }

  findAll(){
    return this.catRepository.find(); //Es la misma sentencia en postgre solo que pasada a tsSELECT * FROM usuarios;
  }

  async findOne(id:number){
    const user = await this.catRepository.findOne({where:{id}})
    if (!user){
       throw new NotFoundException //Si no se encuentra al usuario lanza una excepcion
  }
  return user
}


  async update(id: number, dto: UpdateBreedDto) {
    const user = await this.findOne(id);

    const updated = Object.assign(user, dto);

    return this.catRepository.save(updated);

    
  }

  async remove(id: number) {
    const user = await this.findOne(id); //Se le asgina el id del usuario que se quiere borrar a la constante usuario para borrarlo
    return this.catRepository.remove(user);
  }
}
