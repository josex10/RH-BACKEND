import { IsNotEmpty, IsNumberString } from "class-validator";

export class MasterDistrictIdCantonDto {
    @IsNumberString()
    @IsNotEmpty()
    clm_id_master_canton: number;
}