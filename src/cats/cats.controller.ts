import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Cats')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}


  @Post()
  @ApiOperation({ summary: 'Crear un nuevo gato (solo admin)' })
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }


  @Get()
  @ApiOperation({ summary: 'Obtener todos los gatos' })
  getAllCats() {
    return this.catsService.getAllCats();
  }


  @ApiTags('Cats / Disponibles')
  @Get('disponibles')
  @ApiOperation({ summary: 'Obtener gatos disponibles para adopción' })
  getAvailableCats() {
    return this.catsService.getAvailableCats();
  }


  @Get(':id')
  @ApiOperation({ summary: 'Obtener un gato por ID' })
  findOne(@Param('id') id: number) {
    return this.catsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un gato (solo admin)' })
  update(@Param('id') id: number, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(id, updateCatDto);
  }


  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un gato (solo admin)' })
  remove(@Param('id') id: number) {
    return this.catsService.remove(id);
  }
}
