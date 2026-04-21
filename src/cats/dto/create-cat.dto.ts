import { IsNumber, IsString, } from "class-validator"

export class CreateCatDto {
    @IsNumber()
    id!:number

    @IsString()
    externalId!:string

    @IsString()
    url!:string

     @IsNumber()
    widht!:number

     @IsNumber()
    height!:number

    @IsString()
    breed?:string
}
