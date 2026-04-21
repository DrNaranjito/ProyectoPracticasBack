import { IsNumber, IsString } from "class-validator";

export class CreateBreedDto {
    @IsNumber()
    id!:number;

    @IsString()
    externalId!:string

    @IsString()
    name!:string

    @IsString()
    temperament!:string

    @IsString()
    origin!:string

     @IsString()
    description!:string

    @IsString()
    wikiUrl!:string





}
