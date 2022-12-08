import { IsNotEmpty, IsNumberString } from "class-validator";

export class MasterStateIdCountryDto {
    @IsNumberString()
    @IsNotEmpty()
    clm_id_master_country: number;
}