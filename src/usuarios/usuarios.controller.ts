import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"; //Importación de Swagger para que salga como tag Users para más control
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { actualizarUsuariosDto } from "./dto/actualizarUsuario.dto";
import { crearUsuariosDto } from "./dto/crearUsuarios.dto";
import { ServiciosUsuario } from "./usuarios.services";



@ApiTags('Users') // Con esta linea estamos declarando que en nuestro Swagger se va a ver la documentación relacionada con los usuarios como "Users"
@Controller('users')
export class ControladoresUsuarios {
  constructor(private readonly servicioUsuario: ServiciosUsuario) { }

  @Post()
  crear(@Body() datosDTO: crearUsuariosDto) {
    return this.servicioUsuario.crear(datosDTO);
  }
  /*
  Decorador POST para la creación de usuarios usando el metodo del servicio.usuarios usando 
  los datos generados por el JSON de el DTO
  
  @Body indica que tiene que recoger los datos del "body" de JSON 
  */

  @Get()
  todos() {
    return this.servicioUsuario.todos();
  }

  /*
  Decorador GET para que devuelva todos los usuarios creados.
  */
  @ApiBearerAuth()
  @Get(':id')
  buscarUno(@Param('id', ParseIntPipe) id: number) {
    return this.servicioUsuario.buscarUno(id);
  }

  /*
  Decorador GET para que devuelva el usuario indicado por los argumentos de entrada usando el id del usuario.
  
  Ya que estamos pidiendo un String tenemos que pasarlo a numero para que la base de datos lo lea bien
  por eso usamos un IntegerPrseInt(esto en java) pero ene ste caso vamos a usar una pipe para parsearlo.
  */

  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() datosDTO: actualizarUsuariosDto
  ) {
    return this.servicioUsuario.update(id, datosDTO);
  }

  /*
  Decorados PATCH indicandonos que sirve para que el usuario pueda actualizar su información. El
  metodo recoge la instrucción de el parametro "id" para saber que usuario tiene que actualizar 
  y lo que se quiere actualizar por el otro parametro string el cual se creará un JSON y de ahí sacara
  la informacion para cambiarla
  */

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.servicioUsuario.remove(id);
  }

  /*
  Decorador DELETE para eliminar un usuario por su id
  */
}
