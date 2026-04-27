import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class crearVerificacionDTO {

  @ApiProperty()
  @IsEmail()
  targetEmail!: string;

  
  @ApiProperty()
  @IsOptional()
  acceptedAt?: Date;
}