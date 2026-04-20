import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ControladoresUsuarios } from './usuarios.controller';
import { ServiciosUsuario } from './usuarios.services';
import { Usuarios } from './usuarios.entidad';

@Module({
  imports: [TypeOrmModule.forFeature([Usuarios])],
  controllers: [ControladoresUsuarios],
  providers: [ServiciosUsuario],
  exports: [ServiciosUsuario],

  //Implementación de los controladores del modulo de usuarios para que funione la aplicación
})
export class UsuariosModule {}