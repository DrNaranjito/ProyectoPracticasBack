import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../auth/Decorator/roles.decorator';
import { Role } from '../auth/Decorator/role.enum';
import { AuthGuard } from '../auth/guard/auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';

@ApiTags('Cats')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) { }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo gato (solo admin)' })
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Validado, Role.Admin)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Obtener todos los gatos' })
  getAllCats() {
    return this.catsService.getAllCats();
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Validado, Role.Admin)
  @ApiBearerAuth()
  @ApiTags('Cats / Disponibles')
  @Get('disponibles')
  @ApiOperation({ summary: 'Obtener gatos disponibles para adopción' })
  getAvailableCats() {
    return this.catsService.getAvailableCats();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiTags('Importación de gatos / Admin')
  @ApiOperation({ summary: 'Importar gatos desde la API externa(solo admin)' })
  @Get('import')
  importCats() {
    return this.catsService.importCats();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Validado, Role.Admin)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un gato por ID' })
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.catsService.findOne(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un gato (solo admin)' })
  update(@Param('id') id: number, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(id, updateCatDto);
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un gato (solo admin)' })
  remove(@Param('id') id: number) {
    return this.catsService.remove(id);
  }

}
