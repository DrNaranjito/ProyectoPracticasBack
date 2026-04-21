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
private readonly breedRepository:Repository<Breed>
  
  ){ }

    create(datosDTO: CreateBreedDto) {
    const raza = this.breedRepository.create(datosDTO);
    return this.breedRepository.save(raza);
  }

  findAll(){
    return this.breedRepository.find(); //Es la misma sentencia en postgre solo que pasada a tsSELECT * FROM usuarios;
  }

  async findOne(id:number){
    const raza = await this.breedRepository.findOne({where:{id}})
    if (!raza){
       throw new NotFoundException //Si no se encuentra al usuario lanza una excepcion
  }
  return raza
}


  async update(id: number, dto: UpdateBreedDto) {
    const raza = await this.findOne(id);

    const updated = Object.assign(raza, dto);

    return this.breedRepository.save(updated);

    
  }

  async remove(id: number) {
    const raza = await this.findOne(id); //Se le asgina el id del usuario que se quiere borrar a la constante usuario para borrarlo
    return this.breedRepository.remove(raza);
  }
}
