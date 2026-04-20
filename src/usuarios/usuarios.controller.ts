import { ApiTags } from "@nestjs/swagger"; //Importación de Swagger para que salga como tag Users para más control
import { Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import { actualizarUsuariosDto } from "./dto/actualizarUsuario.dto";
import { crearUsuariosDto } from "./dto/crearUsuarios.dto";
import { ServiciosUsuario } from "./usuarios.services";


@ApiTags('Users') // Con esta linea estamos declarando que en nuestro Swagger se va a ver la documentación relacionada con los usuarios como "Users"
@Controller('users')
export class ControladoresUsuarios{
 constructor(private readonly servicioUsuario: ServiciosUsuario) {}

  @Post()
  crear(@Body() datosDTO: crearUsuariosDto) {
    return this.servicioUsuario.crear(datosDTO);
  }

  @Get()
  todos() {
    return this.servicioUsuario.todos();
  }

  @Get(':id')
  buscarUno(@Param('id') id: string) {
    return this.servicioUsuario.buscarUno(+id);
  }

  @Patch(':id')
  actualizar(
    @Param('id') id: string, 
    @Body() datosDTO: actualizarUsuariosDto
  ) {
    return this.servicioUsuario.update(+id, datosDTO);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.servicioUsuario.remove(+id);
  }
}
