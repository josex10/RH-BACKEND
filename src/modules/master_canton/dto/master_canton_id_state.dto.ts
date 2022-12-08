import { IsNotEmpty, IsNumberString } from "class-validator";

export class MasterCantonIdStateDto {
    @IsNumberString()
    @IsNotEmpty()
    clm_id_master_state: number;
}