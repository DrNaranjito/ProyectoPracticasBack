import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
      where: { petId: IsNull() },
      relations: ['breed'],
    });
  }

  async update(id: number, dto: UpdateCatDto) {
    const gato = await this.findOne(id);
    const updated = Object.assign(gato, dto);
    return this.catRepository.save(updated);
  }

  async remove(id: number) {
    const cat = await this.catRepository.findOne({
      where: { id },
      relations: ['pet'],
    });

    if (!cat) {
      throw new NotFoundException('El gato no existe');
    }

    if (cat.pet) {
      throw new BadRequestException('No puedes borrar un gato que está adoptado');
    }

    return this.catRepository.remove(cat);
  }


async importCats() {
  const response = await this.httpService.axiosRef.get(
    'https://api.thecatapi.com/v1/images/search?limit=5&has_breeds=1&include_breeds=1',
    {
      headers: {
        'x-api-key': process.env.CAT_API_KEY,
      },
    },
  );

  const cats = response.data;

  for (const apiCat of cats) {

    if (!apiCat.breeds || apiCat.breeds.length === 0) {
      console.log('Gato sin raza, saltado');
      continue;
    }

    const breedData = apiCat.breeds[0];

    // 1. Buscar si existe
    let breed = await this.breedRepository.findOne({
      where: { externalId: breedData.id },
    });

    // 2. Crear si no existe
    if (!breed) {
      breed = this.breedRepository.create({
        externalId: breedData.id,
        name: breedData.name,
        temperament: breedData.temperament ?? null,
        origin: breedData.origin ?? null,
        description: breedData.description ?? null,
        wikiUrl: breedData.wikipedia_url ?? null,

        // Valores numéricos protegidos
        child_friendly: breedData.child_friendly ?? 0,
        dog_friendly: breedData.dog_friendly ?? 0,
        energy_level: breedData.energy_level ?? 0,
        intelligence: breedData.intelligence ?? 0,
        stranger_friendly: breedData.stranger_friendly ?? 0,
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
