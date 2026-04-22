import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ServiciosVerificacion } from "./verificacion.service";
import { crearVerificacionDTO } from "./dto/crearVerificacion.dto";
import { actualizarVerificacionDTO } from "./dto/actualizarVerificacion.dto";

@ApiTags('Verificacion') // Con esta linea estamos declarando que en nuestro Swagger se va a ver la documentación relacionada con los usuarios como "Users"
@Controller('Verificacion')
export class ControladoresVerificacion{
 constructor(private readonly vericicacionServicios: ServiciosVerificacion) {}

  @Post()
  crear(@Body() datosDTO: crearVerificacionDTO) {
    return this.vericicacionServicios.crear(datosDTO);
  }
/*
Decorador POST para la creación de usuarios usando el metodo del servicio.usuarios usando 
los datos generados por el JSON de el DTO

@Body indica que tiene que recoger los datos del "body" de JSON 
*/
  
  @Get()
  todos() {
    return this.vericicacionServicios.todos();
  }

/*
Decorador GET para que devuelva todos los usuarios creados.
*/

  @Get(':id')
  buscarUno(@Param('id', ParseIntPipe) id: number) {
    return this.vericicacionServicios.buscarUno(id);
  }

/*
Decorador GET para que devuelva el usuario indicado por los argumentos de entrada usando el id del usuario.

Ya que estamos pidiendo un String tenemos que pasarlo a numero para que la base de datos lo lea bien
por eso usamos un IntegerPrseInt(esto en java) pero ene ste caso vamos a usar una pipe para parsearlo.
*/

  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number, 
    @Body() datosDTO: actualizarVerificacionDTO
  ) {
    return this.vericicacionServicios.update(id, datosDTO);
  }

/*
Decorados PATCH indicandonos que sirve para que el usuario pueda actualizar su información. El
metodo recoge la instrucción de el parametro "id" para saber que usuario tiene que actualizar 
y lo que se quiere actualizar por el otro parametro string el cual se creará un JSON y de ahí sacara
la informacion para cambiarla
*/

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.vericicacionServicios.remove(id);
  }

/*
Decorador DELETE para eliminar un usuario por su id
*/
}

