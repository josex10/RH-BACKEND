import { IsNotEmpty, IsNumberString } from "class-validator";

export class GeneralIdParamsDto {
    @IsNumberString()
    @IsNotEmpty()
    id: number;
}