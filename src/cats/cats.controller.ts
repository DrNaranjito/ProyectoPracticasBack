import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Roles } from '../auth/Decorator/roles.decorator';
import { Role } from '../auth/Decorator/role.enum';

@ApiTags('Cats')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}


  @Roles(Role.Admin)
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo gato (solo admin)' })
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }


  @Roles(Role.Validado)
  @Get()
  @ApiOperation({ summary: 'Obtener todos los gatos' })
  getAllCats() {
    return this.catsService.getAllCats();
  }


  @Roles(Role.Validado,Role.Admin)
  @ApiTags('Cats / Disponibles')
  @Get('disponibles')
  @ApiOperation({ summary: 'Obtener gatos disponibles para adopción' })
  getAvailableCats() {
    return this.catsService.getAvailableCats();
  }


  @Roles(Role.Validado,Role.Admin)
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un gato por ID' })
  findOne(@Param('id') id: number) {
    return this.catsService.findOne(id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un gato (solo admin)' })
  update(@Param('id') id: number, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(id, updateCatDto);
  }


  @Roles(Role.Admin)
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un gato (solo admin)' })
  remove(@Param('id') id: number) {
    return this.catsService.remove(id);
  }
}
