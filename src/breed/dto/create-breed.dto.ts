import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateBreedDto {
    @ApiProperty()
    @IsString()
    externalId!: string

    @ApiProperty()
    @IsString()
    name!: string

    @ApiProperty()
    @IsString()
    temperament!: string

    @ApiProperty()
    @IsString()
    origin!: string

    @ApiProperty()
    @IsString()
    description!: string

    @ApiProperty()
    @IsString()
    wikiUrl!: string
}
