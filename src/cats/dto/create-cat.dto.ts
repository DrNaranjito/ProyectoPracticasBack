import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString, } from "class-validator"

export class CreateCatDto {
    @ApiProperty()
    @IsString()
    externalId!: string

    @ApiProperty()
    @IsString()
    url!: string

    @ApiProperty()
    @IsNumber()
    width!: number

    @ApiProperty()
    @IsNumber()
    height!: number

    @ApiProperty()
    @IsNumber()
    breedId!: number
}
