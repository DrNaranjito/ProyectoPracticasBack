import { 
  Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards 
} from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { ServiciosPet } from './pet.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Pets / Adopción')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('pet')
export class PetController {
  constructor(private readonly petService: ServiciosPet) {}


  @Post()
  @ApiOperation({ summary: 'Adoptar un gato' })
  adoptar(@Body() dto: CreatePetDto, @Req() req) {
    return this.petService.adoptar(dto, req.user.sub);
  }


  @Get('my')
  @ApiOperation({ summary: 'Obtener las mascotas del usuario autenticado' })
  getMyPets(@Req() req) {
    return this.petService.misMascotas(req.user.sub);
  }


  @Delete('devolver/:id')
  @ApiOperation({ summary: 'Devolver (desadoptar) una mascota' })
  devolver(@Param('id') id: number, @Req() req) {
    return this.petService.devolver(id, req.user.sub);
  }


  @Get(':id')
  @ApiOperation({ summary: 'Buscar una mascota por ID' })
  findOne(@Param('id') id: number) {
    return this.petService.buscarUno(id);
  }


  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar datos de una mascota' })
  update(@Param('id') id: number, @Body() updatePetDto: UpdatePetDto) {
    return this.petService.update(id, updatePetDto);
  }


  @Delete('admin/:id')
  @ApiOperation({ summary: 'Eliminar una mascota (solo admin)' })
  remove(@Param('id') id: number) {
    return this.petService.remove(id);
  }
}
