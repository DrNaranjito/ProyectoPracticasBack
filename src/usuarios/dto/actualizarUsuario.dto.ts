import { IsOptional, IsString } from "class-validator";

export class actualizarUsuariosDto {
    @IsOptional()
    @IsString()
    mail?: string;

    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsString()
    role?: 'validado' | 'sinValidar';
    
    @IsOptional()
    @IsString()
    language?: 'Español' | 'Inglés';
}

//En esta clase se pone el interrogante en vez de la exclamación ya que poner el dato o no es opcionalW