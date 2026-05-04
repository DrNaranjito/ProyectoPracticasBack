import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCatDto } from './create-cat.dto';
import { IsNumber } from 'class-validator';

export class UpdateCatDto{
    @ApiProperty()
    @IsNumber()
    width?: number
    
    @ApiProperty()
    @IsNumber()
    height?: number
}   
