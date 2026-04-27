import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class CatsService {

  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>

  ) { }

  async create(datosDTO: CreateCatDto) {
    const cat = this.catRepository.create({
      externalId: datosDTO.externalId,
      url: datosDTO.url,
      width: datosDTO.width,
      height: datosDTO.height,
      breed: { id: datosDTO.breedId }, // ← IMPORTANTE
    });

    await this.catRepository.save(cat);
  }


  async findOne(id: number) {
    const gato = await this.catRepository.findOne({ where: { id } })
    if (!gato) {
      throw new NotFoundException //Si no se encuentra al usuario lanza una excepcion
    }
    return gato
  }

  getAllCats() {
    return this.catRepository.find({
      relations: ['breed', 'pet', 'pet.user'],
    });
  }

  async getCatById(id: number) {
    const cat = await this.catRepository.findOne({
      where: { id },
      relations: ['breed', 'pet'],
    });

    if (!cat) throw new NotFoundException('Gato no encontrado');
    return cat;
  }


  async getAvailableCats() {
    return this.catRepository.find({
      where: { pet: IsNull() },
      relations: ['breed'],
    });
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
