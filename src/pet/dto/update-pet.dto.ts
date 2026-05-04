import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePetDto } from './create-pet.dto';
import { IsString } from 'class-validator';

export class UpdatePetDto {

  @ApiProperty()
  @IsString()
  name?: string;
}
