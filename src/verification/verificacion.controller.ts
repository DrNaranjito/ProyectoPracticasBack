import { 
  Body, Controller, Get, Post, UseGuards 
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { ServiciosVerificacion } from './verificacion.service';
import { Roles } from '../auth/Decorator/roles.decorator';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Role } from '../auth/Decorator/role.enum';
import { aceptarVerificacionDTO } from './dto/aceptarUsuario';
import { rechazarVerificacionDTO } from './dto/rechazarUsuario';
import { RolesGuard } from '../auth/guard/roles.guard';

@ApiTags('Verificación / Admin')
@Controller('verificacion')
export class ControladoresVerificacion {
  constructor(private readonly verificacionServicios: ServiciosVerificacion) {}


  @UseGuards(AuthGuard, RolesGuard)
  @ApiTags('Verificación / Admin')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Get('pending')
  @ApiOperation({ summary: 'Obtener usuarios pendientes de verificación (solo admin)' })
  getPending() {
    return this.verificacionServicios.getPendingUsers();
  }


  @UseGuards(AuthGuard, RolesGuard)
  @ApiTags('Verificación / Admin')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @Post('accept')
  @ApiOperation({ summary: 'Aceptar un usuario pendiente (solo admin)' })
  accept(@Body() dto: aceptarVerificacionDTO) {
    return this.verificacionServicios.acceptUser(dto.targetEmail);
  }


  @UseGuards(AuthGuard, RolesGuard)
  @ApiTags('Verificación / Admin')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @Post('reject')
  @ApiOperation({ summary: 'Rechazar un usuario pendiente (solo admin)' })
  reject(@Body() dto: rechazarVerificacionDTO) {
    return this.verificacionServicios.rejectUser(dto.targetEmail);
  }
}
