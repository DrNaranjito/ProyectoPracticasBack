import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class crearVerificacionDTO {
  @ApiProperty()
  @IsString()
  verificationToken!: string;

  @ApiProperty()
  @IsEmail()
  targetEmail!: string;
}