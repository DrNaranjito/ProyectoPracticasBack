import { IsString } from "class-validator";

export class crearUsuariosDto{
    @IsString()
    mail! : string;
    @IsString()
    name! : string
    @IsString()
    password! :  string;
    @IsString()
    role! : 'registrado' | 'sinRegistrar' | 'Admin';
    @IsString()
    language! : 'Español' | 'Inglés';
}

//Con esta clase me aseguro de que el usuario