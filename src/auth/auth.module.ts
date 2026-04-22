import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt.constant';
import { ConfigModule } from '@nestjs/config';
import { env } from 'process';

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
  ],
  controllers: [AuthController],
  providers: [AuthService]

})
export class AuthModule { }
