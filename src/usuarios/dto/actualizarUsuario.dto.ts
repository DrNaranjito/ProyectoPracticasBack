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

}

//En esta clase se pone el interrogante en vez de la exclamación ya que poner el dato o no es opcionalW