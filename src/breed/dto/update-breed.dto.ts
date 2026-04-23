import { PartialType } from '@nestjs/swagger';
import { CreateBreedDto } from './create-breed.dto';
import { IsString } from 'class-validator';

export class UpdateBreedDto extends PartialType(CreateBreedDto) {

    @IsString()
    name?: string

    @IsString()
    temperament?: string

    @IsString()
    description?: string
}
