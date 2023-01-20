import { IsNotEmpty, IsNumberString } from "class-validator";

export class IdParamMasterUserDto {
    @IsNumberString()
    @IsNotEmpty()
    id: number;
}