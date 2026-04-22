import { PartialType } from '@nestjs/swagger';
import { CreatePetDto } from './create-pet.dto';
import { IsString } from 'class-validator';

export class UpdatePetDto extends PartialType(CreatePetDto) {

@IsString()
  name?: string;
}
