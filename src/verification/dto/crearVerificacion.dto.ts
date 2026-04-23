import { IsEmail, IsString } from "class-validator";

export class crearVerificacionDTO {
  @IsString()
  verificationToken!: string;

  @IsEmail()
  targetEmail!: string;
}