import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    // 1. Variables de entorno
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    // 2. Conexión a la base de datos
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

    // 3. Módulos de tu aplicación
    UsuariosModule,
    AuthModule,
  ],
})
export class AppModule {}
