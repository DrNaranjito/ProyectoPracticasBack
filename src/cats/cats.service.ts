import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CatsService {

  constructor(
@InjectRepository(Cat)
private readonly catRepository:Repository<Cat>
  
  ){ }

    create(datosDTO: CreateCatDto) {
    const gato = this.catRepository.create(datosDTO);
    return this.catRepository.save(gato);
  }

  findAll(){
    return this.catRepository.find(); //Es la misma sentencia en postgre solo que pasada a tsSELECT * FROM usuarios;
  }

  async findOne(id:number){
    const gato = await this.catRepository.findOne({where:{id}})
    if (!gato){
       throw new NotFoundException //Si no se encuentra al usuario lanza una excepcion
  }
  return gato
}


  async update(id: number, dto: UpdateCatDto) {
    const gato = await this.findOne(id);

    const updated = Object.assign(gato, dto);

    return this.catRepository.save(updated);

    
  }

  async remove(id: number) {
    const gato = await this.findOne(id); //Se le asgina el id del usuario que se quiere borrar a la constante usuario para borrarlo
    return this.catRepository.remove(gato);
  }
}
