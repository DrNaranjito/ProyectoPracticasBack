import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Verificacion } from './verificacion.entidad';
import { ControladoresVerificacion } from './verificacion.controller';
import { ServiciosVerificacion } from './verificacion.service';



@Module({
  imports: [TypeOrmModule.forFeature([Verificacion])], //Se especifica que entidad se va a usar en este módulo.
  controllers: [ControladoresVerificacion],
  providers: [ServiciosVerificacion],
  exports: [ServiciosVerificacion],

  //Implementación de los controladores del modulo de usuarios para que funione la aplicación
})
export class VerificacionModule { }