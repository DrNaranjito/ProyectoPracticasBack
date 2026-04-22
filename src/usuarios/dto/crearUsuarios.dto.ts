import { IsOptional, IsString } from "class-validator";

export class crearUsuariosDto{
    @IsString()
    name! : string;
    @IsString()
    mail! : string
    @IsString()
    password! :  string;
    @IsString()
    @IsOptional()
    role! : 'validado' | 'sinValidar' | 'Admin';
    @IsString()
    @IsOptional()
    language! : 'Español' | 'Inglés';
}

