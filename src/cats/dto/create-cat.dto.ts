import { IsNumber, IsString, } from "class-validator"

export class CreateCatDto {
    @IsString()
    externalId!: string

    @IsString()
    url!: string

    @IsNumber()
    width!: number

    @IsNumber()
    height!: number

    @IsNumber()
    breedId!: number
}
