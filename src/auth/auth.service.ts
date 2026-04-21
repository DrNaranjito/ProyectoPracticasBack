import { Injectable } from '@nestjs/common';
import { ServiciosUsuario } from '../usuarios/usuarios.services'; 
import { registerDto } from './dto/register.dto';


@Injectable()
export class AuthService {

    constructor(
        private readonly ServiciosUsuario : ServiciosUsuario
    ){} 
    
    login(){

    }

   async crear(datosDTO: registerDto) {
       
       return await this.ServiciosUsuario.crearDesdeAuth(datosDTO);
     }
}
