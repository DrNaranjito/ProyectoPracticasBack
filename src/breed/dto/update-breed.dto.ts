import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBreedDto } from './create-breed.dto';
import { IsString } from 'class-validator';

export class UpdateBreedDto extends PartialType(CreateBreedDto) {

    @ApiProperty()
    @IsString()
    name?: string

    @ApiProperty()
    @IsString()
    temperament?: string

    @ApiProperty()
    @IsString()
    description?: string
}
