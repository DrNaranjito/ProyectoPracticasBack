import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";


export class loginDto {

    @ApiProperty()
    @IsEmail()
    email!: string;

    @ApiProperty()
    @IsString()
    @MinLength(8)
    @Transform(({ value }) => value.trim())
    password!: string

}