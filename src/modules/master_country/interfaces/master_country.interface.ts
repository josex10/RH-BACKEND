import { IGeneralCommon } from "src/commons/interfaces/general_common.interface";
import { IMasterMaintenance } from "src/commons/interfaces/master_maintenance.interface";

export interface IMasterCountry extends IMasterMaintenance, IGeneralCommon{
    clm_shortname: string;
    clm_name: string;
    clm_currency_name: string;
    clm_currency_symbol: string;
    clm_currency_shortname: string;
    clm_number_code: string;
}