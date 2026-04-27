import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class ActualizarVerificacionDto {
  @ApiProperty()
  @IsOptional()
  @IsEmail()
  targetEmail?: string;
}