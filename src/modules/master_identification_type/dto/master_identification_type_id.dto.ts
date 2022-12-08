import { IsNotEmpty, IsNumberString } from "class-validator";

export class MasterIdentificationTypeIdDto {
    @IsNumberString()
    @IsNotEmpty()
    clm_id: number;
}