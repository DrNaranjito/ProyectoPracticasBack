import { IsString } from "class-validator";

export class actualizarUsuariosDto{
    @IsString()
    mail? : string;
    @IsString()
    name? : string
    @IsString()
    password? :  string;
    @IsString()
    role? : 'registrado' | 'sinRegistrar';
    @IsString()
    language? : 'Español' | 'Inglés';
}

//En esta clase se pone el interrogante en vez de la exclamación ya que poner el dato o no es opcionalW