import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";


export class registerDto {

    @ApiProperty()
    @IsString()
    @Transform(({ value }) => value.trim())
    name!: string;

    @ApiProperty()
    @IsEmail()
    email!: string;

    @ApiProperty()
    @IsString()
    @MinLength(8)
    @Transform(({ value }) => value.trim())
    //Esta linea se esta encargando de que si hay espacios en blanco los elimine 
    //Se usa gracias a el paquete de class-transformer
    password!: string;
}