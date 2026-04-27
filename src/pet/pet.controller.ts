import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { ServiciosPet } from './pet.service';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: ServiciosPet) { }

  @Post()
  adoptar(@Body() dto: CreatePetDto, @Req() req) {
    return this.petService.adoptar(dto, req.usersub);
  }

  @Get('my')
  getMyPets(@Req() req) {
    return this.petService.misMascotas(req.usersub);
  }

  @Delete(':id')
  devolver(@Param('id') id: number, @Req() req) {
    return this.petService.devolver(id, req.user.sub);
  }

//En todos estos controladores se necesitan las request del usuario ya que se le tienen que asignar ya que sino se le pone de esta manera  no se sabe donde poner los datos


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
