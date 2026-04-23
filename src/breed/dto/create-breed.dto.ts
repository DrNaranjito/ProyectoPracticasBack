import { IsString } from "class-validator";

export class CreateBreedDto {
    @IsString()
    externalId!: string

    @IsString()
    name!: string

    @IsString()
    temperament!: string

    @IsString()
    origin!: string

    @IsString()
    description!: string

    @IsString()
    wikiUrl!: string
}
