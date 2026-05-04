import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { env } from 'process';
import { RolesGuard } from './guard/roles.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from '../usuarios/usuarios.entidad';
import { Verificacion } from '../verification/verificacion.entidad';

@Module({


  imports:

    [ConfigModule.forRoot({
      envFilePath: '.env',
    }),

      UsuariosModule,
    JwtModule.register({
      global: true, //Dice que cualqueir servicio puede usar JWT
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: '1H' },
    }),

    TypeOrmModule.forFeature([Usuarios, Verificacion])
    ],
  controllers: [AuthController],
  providers: [AuthService, RolesGuard]

})
export class AuthModule { }
