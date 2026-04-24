import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class actualizarUsuariosDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    mail?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    name?: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    password?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    role?: 'validado' | 'sinValidar';
    
    @ApiProperty()
    @IsOptional()
    @IsString()
    language?: 'Español' | 'Inglés';
}

//En esta clase se pone el interrogante en vez de la exclamación ya que poner el dato o no es opcionalW