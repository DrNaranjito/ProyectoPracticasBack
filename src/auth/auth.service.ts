import { BadRequestException, Injectable } from '@nestjs/common';
import { ServiciosUsuario } from '../usuarios/usuarios.services'; 
import { registerDto } from './dto/register.dto';

import * as bcryptjs from 'bcryptjs';


@Injectable()
export class AuthService {

    constructor(
        private readonly ServiciosUsuario : ServiciosUsuario
    ){} 
    
    login(){

    }

   async crear({name, email, password}: registerDto) {
       
    //Desglosamos los datosDTO previos para poder usar el email en forma de string para
    //poder usarlo como parametro en nuestro metodo para no repetir emails.

    const usuarioRegistrado = await this.ServiciosUsuario.buscarPorEmail(email)

    if(usuarioRegistrado){
        throw new BadRequestException('Este email ya existe.')
    }

    return await this.ServiciosUsuario.crearDesdeAuth({
        name,
         email, 
         password : await bcryptjs.hash(password,10) //Con esta sentencia estamos encriptando la contraseña.
        });
    }

    //Controlación en la que si el email ya existe se prohibe volver a crear con el mismo usuario.
}
