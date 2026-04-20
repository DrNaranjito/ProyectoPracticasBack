import { Module } from '@nestjs/common';
import { ServiciosUsuario } from './usuarios.services';

@Module({
  providers: [ServiciosUsuario],
  exports: [ServiciosUsuario],
})
export class ModuleUsuarios{}