import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { ServiciosPet } from './pet.service';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: ServiciosPet) { }

  @Post()
  create(@Body() createPetDto: CreatePetDto) {
    return this.petService.crear(createPetDto);
  }

  @Get()
  findAll() {
    return this.petService.todos();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.petService.buscarUno(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePetDto: UpdatePetDto) {
    return this.petService.update(id, updatePetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petService.remove(+id);
  }
}
