import { 
  ApiBearerAuth, ApiTags, ApiOperation 
} from "@nestjs/swagger";
import { 
  Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards 
} from "@nestjs/common";
import { actualizarUsuariosDto } from "./dto/actualizarUsuario.dto";
import { crearUsuariosDto } from "./dto/crearUsuarios.dto";
import { ServiciosUsuario } from "./usuarios.services";
import { AuthGuard } from "../auth/guard/auth.guard";
import { Roles } from "../auth/Decorator/roles.decorator";
import { Role } from "../auth/Decorator/role.enum";

@ApiTags('Users')
@Controller('users')
export class ControladoresUsuarios {
  constructor(private readonly servicioUsuario: ServiciosUsuario) {}


  @Roles( Role.Admin)
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario (solo admin)' })
  crear(@Body() datosDTO: crearUsuariosDto) {
    return this.servicioUsuario.crear(datosDTO);
  }


  @Roles(Role.Admin)
  @ApiTags('Users / Admin')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios (solo admin)' })
  findAll() {
    return this.servicioUsuario.todos();
  }

  @Roles(Role.Admin)
  @ApiTags('Users / Admin')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por ID (solo admin)' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.servicioUsuario.buscarUno(id);
  }


  @Roles(Role.Admin)
  @ApiTags('Users / Admin')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un usuario (solo admin)' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() datosDTO: actualizarUsuariosDto
  ) {
    return this.servicioUsuario.update(id, datosDTO);
  }


  @Roles(Role.Admin)
  @ApiTags('Users / Admin')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario (solo admin)' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.servicioUsuario.remove(id);
  }
}
