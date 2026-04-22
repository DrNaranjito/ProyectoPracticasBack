import { PartialType } from '@nestjs/swagger';
import { CreateCatDto } from './create-cat.dto';
import { IsNumber } from 'class-validator';

export class UpdateCatDto extends PartialType(CreateCatDto) {
@IsNumber()
widht?:number
@IsNumber()
height?:number
}   
