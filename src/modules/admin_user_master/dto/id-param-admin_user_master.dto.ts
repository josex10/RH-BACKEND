import { IsNotEmpty, IsNumberString } from "class-validator";

export class IdParamAdminUserMasterDto {
    @IsNumberString()
    @IsNotEmpty()
    id: number;
}