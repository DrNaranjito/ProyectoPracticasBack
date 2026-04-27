import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class rechazarVerificacionDTO {
  @ApiProperty()
  @IsString()
  @IsEmail()
  targetEmail!: string;

}