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
import { RolesGuard } from '../auth/guard/roles.guard';

@Controller('breed')
export class BreedController {
  constructor(private readonly breedService: BreedService) {}


  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiTags('Breeds / Admin')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Crear una nueva raza (solo admin)' })
  create(@Body() dto: CreateBreedDto) {
    return this.breedService.create(dto);
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiTags('Breeds')
  @Get()
  @ApiOperation({ summary: 'Obtener todas las razas' })
  findAll() {
    return this.breedService.findAll();
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiTags('Breeds')
  @Get(':id')
  @ApiOperation({ summary: 'Obtener una raza por ID' })
  findOne(@Param('id') id: number) {
    return this.breedService.findOne(id);
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiTags('Breeds / Admin')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una raza (solo admin)' })
  update(@Param('id') id: number, @Body() updateBreedDto: UpdateBreedDto) {
    return this.breedService.update(id, updateBreedDto);
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiTags('Breeds / Admin')
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una raza (solo admin)' })
  remove(@Param('id') id: number) {
    return this.breedService.remove(id);
  }
}
