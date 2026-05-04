import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ServiciosUsuario } from '../usuarios/usuarios.services';
import { registerDto } from './dto/register.dto';

import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { loginDto } from './dto/login.dto';
import { Repository } from 'typeorm';
import { Verificacion } from '../verification/verificacion.entidad';
import { InjectRepository } from '@nestjs/typeorm';




@Injectable()
export class AuthService {



    constructor(
        private readonly ServiciosUsuario: ServiciosUsuario,
        private readonly jwtService: JwtService,

        @InjectRepository(Verificacion)
        private readonly verificacionRepository: Repository<Verificacion>,
    ) { }

    async register({ name, email, password }: registerDto) {

        const usuarioRegistrado = await this.ServiciosUsuario.buscarPorEmail(email);

        if (usuarioRegistrado) {
            throw new BadRequestException('Este email ya existe.');
        }

        const user = await this.ServiciosUsuario.crearDesdeAuth({
            name,
            email,
            password: await bcryptjs.hash(password, 10),
        });

        const verificationToken = crypto.randomUUID();

        const verificacion = this.verificacionRepository.create({
            targetEmail: user.mail,
            verificationToken,
            createdAt: new Date(),
            user: user
        });

        await this.verificacionRepository.save(verificacion);

        return {
            message: 'Usuario registrado. Pendiente de aprobación por un administrador.'
        };
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
        const payload = { sub: usuarioRegistrado.id, email: usuarioRegistrado.mail, role: usuarioRegistrado.role } //Se le mete el rol para que el token sepa que rol es.

        const token = await this.jwtService.signAsync(payload)

        return {
            token, email
        };


    }

    async getProfile(user: { email: string; rol: string }) {
        const usuario = await this.ServiciosUsuario.buscarPorEmail(user.email);

        if (!usuario) {
            throw new NotFoundException('Usuario no encontrado');
        }

        return usuario;
    }


    /*
            const usuarioRegistrado = await this.userRepository.findOne({
            where: { mail: email } // IMPORTANTE: mail, no email
        });
    */
}
