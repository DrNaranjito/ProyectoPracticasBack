import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ServiciosUsuario } from '../usuarios/usuarios.services';
import { registerDto } from './dto/register.dto';

import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { loginDto } from './dto/login.dto';




@Injectable()
export class AuthService {



    constructor(
        private readonly ServiciosUsuario: ServiciosUsuario,
        private readonly jwtService: JwtService //Implementamos el generador de tokens a la clase AuthServices
    ) { }

    async register({ name, email, password }: registerDto) {

        //Desglosamos los datosDTO previos para poder usar el email en forma de string para
        //poder usarlo como parametro en nuestro metodo para no repetir emails.

        const usuarioRegistrado = await this.ServiciosUsuario.buscarPorEmail(email)

        if (usuarioRegistrado) {
            throw new BadRequestException('Este email ya existe.')
        }

        return await this.ServiciosUsuario.crearDesdeAuth({
            name,
            email,
            password: await bcryptjs.hash(password, 10) //Con esta sentencia estamos encriptando la contraseña.
        });
    }

    async login({ email, password }: loginDto) {
        const usuarioRegistrado = await this.ServiciosUsuario.buscarPorEmail(email)

        if (!usuarioRegistrado) {
            throw new UnauthorizedException('Email no correcto.')
        }

        const contraseñaValida = await bcryptjs.compare(password, usuarioRegistrado.password)
        //Esta linea se encarga de comparar la contraseña que ha introducido el usuario con la contraseña ya hasheada
        if (!contraseñaValida) {
            throw new UnauthorizedException('Contraseña invalida')
        }
        const payload = { email: usuarioRegistrado.mail, role: usuarioRegistrado.role } //Se le mete el rol para que el token sepa que rol es.

        const token = await this.jwtService.signAsync(payload)

        return {
            token, email
        };

        //TODO controlar los tokens se mejor manera. Esto tan solo es una prueba de creación de tokens

    }

    async getProfile({ email, role }: { email: string, role: string }) {

        /*    if(role != 'Admin'){
        
                throw new UnauthorizedException(
                    'No tienes los permisos suficientes para realizar esta ac'
                )
            }
        
            */
        return await this.ServiciosUsuario.buscarPorEmail(email)

    }

}
