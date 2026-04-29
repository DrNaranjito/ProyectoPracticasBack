import { 
  Controller, Get, Post, Body, Patch, Param, Delete, UseGuards 
} from '@nestjs/common';
import { BreedService } from './breed.service';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Roles } from '../auth/Decorator/roles.decorator';
import { Role } from '../auth/Decorator/role.enum';

@Controller('breed')
export class BreedController {
  constructor(private readonly breedService: BreedService) {}


  @Roles(Role.Admin)
  @ApiTags('Breeds / Admin')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Crear una nueva raza (solo admin)' })
  create(@Body() dto: CreateBreedDto) {
    return this.breedService.create(dto);
  }


  @Roles(Role.Admin)
  @ApiTags('Breeds')
  @Get()
  @ApiOperation({ summary: 'Obtener todas las razas' })
  findAll() {
    return this.breedService.findAll();
  }


  @Roles(Role.Admin)
  @ApiTags('Breeds')
  @Get(':id')
  @ApiOperation({ summary: 'Obtener una raza por ID' })
  findOne(@Param('id') id: number) {
    return this.breedService.findOne(id);
  }


  @Roles(Role.Admin)
  @ApiTags('Breeds / Admin')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una raza (solo admin)' })
  update(@Param('id') id: number, @Body() updateBreedDto: UpdateBreedDto) {
    return this.breedService.update(id, updateBreedDto);
  }


  @Roles(Role.Admin)
  @ApiTags('Breeds / Admin')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una raza (solo admin)' })
  remove(@Param('id') id: number) {
    return this.breedService.remove(id);
  }
}
