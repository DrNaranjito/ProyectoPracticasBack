import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail } from "class-validator";

export class aceptarVerificacionDTO {

  @ApiProperty()
  @IsEmail()
  targetEmail!: string;

  
  @ApiProperty()
  @IsDate()
  acceptedAt!: Date;
}