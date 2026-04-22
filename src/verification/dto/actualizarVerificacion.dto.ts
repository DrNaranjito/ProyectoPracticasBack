import { IsEmail, IsOptional, IsString } from "class-validator";

export class ActualizarVerificacionDto {
  @IsOptional()
  @IsString()
  verificationToken?: string;

  @IsOptional()
  @IsEmail()
  targetEmail?: string;

  @IsOptional()
  acceptedAt?: Date;
}