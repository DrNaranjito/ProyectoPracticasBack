import { IsBoolean } from "class-validator";

export class actualizarVerificacionDTO{
    @IsBoolean()
    verificationToken?: boolean;
}