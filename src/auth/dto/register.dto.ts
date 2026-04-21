import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";


export class registerDto{

    @IsString()
    @MinLength(10)
    @Transform(({value}) => value.trim()) 
    name!:string;

    @IsEmail()
    email!:string;

    @IsString()
    @MinLength(8)
    @Transform(({value}) => value.trim()) 
    //Esta linea se esta encargando de que si hay espacios en blanco los elimine 
    //Se usa gracias a el paquete de class-transformer
    
    password!:string;
}