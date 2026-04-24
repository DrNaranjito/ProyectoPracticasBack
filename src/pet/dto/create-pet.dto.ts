import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreatePetDto { 

  @ApiProperty()
  @IsString()
  name!: string;
  
  @ApiProperty()
  @IsNumber()
  catId!: number;
}
