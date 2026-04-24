import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCatDto } from './create-cat.dto';
import { IsNumber } from 'class-validator';

export class UpdateCatDto extends PartialType(CreateCatDto) {
    @ApiProperty()
    @IsNumber()
    widht?: number
    
    @ApiProperty()
    @IsNumber()
    height?: number
}   
