import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ServiciosVerificacion } from "./verificacion.service";
import { crearVerificacionDTO } from "./dto/crearVerificacion.dto";
import { ActualizarVerificacionDto } from "./dto/actualizarVerificacion.dto";

@ApiTags('Verificacion') // Con esta linea estamos declarando que en nuestro Swagger se va a ver la documentación relacionada con los usuarios como "Users"
@Controller('Verificacion')
export class ControladoresVerificacion {
  constructor(private readonly vericicacionServicios: ServiciosVerificacion) { }

  @Post()
  crear(@Body() datosDTO: crearVerificacionDTO) {
    return this.vericicacionServicios.crear(datosDTO);
  }

  @Get()
  todos() {
    return this.vericicacionServicios.todos();
  }

  @Get(':id')
  buscarUno(@Param('id', ParseIntPipe) id: number) {
    return this.vericicacionServicios.buscarUno(id);
  }

  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() datosDTO: ActualizarVerificacionDto
  ) {
    return this.vericicacionServicios.update(id, datosDTO);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.vericicacionServicios.remove(id);
  }

}

