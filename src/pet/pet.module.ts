import { Module } from '@nestjs/common';
import { ServiciosPet } from './pet.service';
import { PetController } from './pet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pet])], //Se especifica que entidad se va a usar en este módulo.
  controllers: [PetController],
  providers: [ServiciosPet],
  exports: [ServiciosPet],
})
export class PetModule {}
