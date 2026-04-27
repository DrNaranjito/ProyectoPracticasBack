import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UsuariosModule } from './usuarios/usuarios.module';
import { CatsModule } from './cats/cats.module';
import { BreedModule } from './breed/breed.module';
import { PetModule } from './pet/pet.module';
import { AuthModule } from './auth/auth.module';
import { SeedService } from './seed/seed.service';
import { Usuarios } from './usuarios/usuarios.entidad';
import { VerificacionModule } from './verification/verificacion.module';

@Module({
  imports: [
    // Conexión a la ruta de las claves en el fichero .env
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),

    TypeOrmModule.forFeature([Usuarios]),// Implementamos El TypeOrm para la creación del administrador usando la entidad de usuario.

    // Conexión a base de datos
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
    }),


    //Implementación de los modulos para la aplicación.
    UsuariosModule,

    CatsModule,

    BreedModule,

    PetModule,

    AuthModule,

    VerificacionModule,


  ],

  providers: [SeedService]
})
export class AppModule { }
