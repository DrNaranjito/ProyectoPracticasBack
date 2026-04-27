import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ServiciosVerificacion } from "./verificacion.service";
import { Roles } from "../auth/Decorator/roles.decorator";
import { AuthGuard } from "../auth/guard/auth.guard";
import { Role } from "../auth/Decorator/role.enum";
import { aceptarVerificacionDTO } from "./dto/aceptarUsuario";
import { rechazarVerificacionDTO } from "./dto/rechazarUsuario";


@ApiTags('Verificacion') // Con esta linea estamos declarando que en nuestro Swagger se va a ver la documentación relacionada con los usuarios como "Users"
@Controller('Verificacion')
export class ControladoresVerificacion {
  constructor(private readonly vericicacionServicios: ServiciosVerificacion) { }

  @Get('pending')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  getPending() {
    return this.vericicacionServicios.getPendingUsers();
  }

  @Post('accept')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  accept(@Body() dto: aceptarVerificacionDTO) {
    return this.vericicacionServicios.acceptUser(dto.targetEmail);
  }

  @Post('reject')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  reject(@Body() dto: rechazarVerificacionDTO) {
    return this.vericicacionServicios.rejectUser(dto.targetEmail);
  }
}

