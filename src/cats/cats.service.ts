import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { IsNull, Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { Breed } from '../breed/entities/breed.entity';


@Injectable()
export class CatsService {

  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,

    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,

    private readonly httpService: HttpService,
  ) { }

  async create(datosDTO: CreateCatDto) {
    const cat = this.catRepository.create({
      externalId: datosDTO.externalId,
      url: datosDTO.url,
      width: datosDTO.width,
      height: datosDTO.height,
      breed: { id: datosDTO.breedId },
    });

    await this.catRepository.save(cat);
  }

  async findOne(id: number) {
    const gato = await this.catRepository.findOne({ where: { id } })
    if (!gato) {
      throw new NotFoundException;
    }
    return gato;
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
    const gato = await this.findOne(id);
    return this.catRepository.remove(gato);
  }

  async importCats() {
    // 1. Llamar a la API externa
    const response = await this.httpService.axiosRef.get(
      'https://api.thecatapi.com/v1/images/search?limit=10&has_breeds=1&include_breeds=1',
      {
        headers: {
          'x-api-key': process.env.CAT_API_KEY,
        },
      },
    );

    const cats = response.data;


    for (const apiCat of cats) {

      // Si no tiene razas, lo saltamos
      if (!apiCat.breeds || apiCat.breeds.length === 0) {
        console.log('Gato sin raza, saltado');
        continue;
      }


      const breedData = apiCat.breeds[0];
      const breedName = breedData.name;

      // 1. Buscar si existe
      let breed = await this.breedRepository.findOne({
        where: { externalId: breedData.id },
      });

      // 2. Si no existe, crearla
      if (!breed) {
        breed = this.breedRepository.create({
          externalId: breedData.id,
          name: breedName,
        });

        await this.breedRepository.save(breed);
      }

      // 3. Crear el gato
      const newCat = this.catRepository.create({
        externalId: apiCat.id,
        url: apiCat.url,
        width: apiCat.width,
        height: apiCat.height,
        breed: breed,
      });

      await this.catRepository.save(newCat);
    }

    return { message: 'Gatos importados correctamente' };
  }
}
