import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class crearUsuariosDto {
    @ApiProperty()
    @IsString()
    name!: string;

    @ApiProperty()
    @IsString()
    mail!: string;

    @ApiProperty()
    @IsString()
    password!: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    role!: 'validado' | 'sinValidar' | 'Admin';

    @ApiProperty()
    @IsString()
    @IsOptional()
    language!: 'Español' | 'Inglés';
}

