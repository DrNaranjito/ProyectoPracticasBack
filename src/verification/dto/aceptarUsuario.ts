import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsOptional } from "class-validator";

export class aceptarVerificacionDTO {

  @ApiProperty()
  @IsEmail()
  targetEmail!: string;

}