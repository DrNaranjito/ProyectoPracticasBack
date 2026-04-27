import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsOptional, IsString } from "class-validator";

export class rechazarVerificacionDTO {
  @ApiProperty()
  @IsString()
  @IsEmail()
  targetEmail!: string;

  @ApiProperty()
  @IsDate()
  rejectedAt!: Date;
}