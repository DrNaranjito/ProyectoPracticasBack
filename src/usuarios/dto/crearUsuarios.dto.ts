import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { Role } from "../../auth/Decorator/role.enum";

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
    role?: Role;

    @ApiProperty()
    @IsString()
    @IsOptional()
    language!: 'Español' | 'Inglés';
}

