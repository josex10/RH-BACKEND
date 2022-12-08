import { IGeneralCommon } from "src/commons/interfaces/general_common.interface";
import { IMasterMaintenance } from "src/commons/interfaces/master_maintenance.interface";

export interface ISystemCompany extends IMasterMaintenance, IGeneralCommon{
    clm_id_identification_type: number;
    clm_id_master_country: number;
    clm_id_master_state: number;
    clm_id_master_canton: number;
    clm_id_master_district: number;
    clm_identification_number: string;
    clm_company_name: string;
    clm_phone: string;
    clm_email: string;
    clm_address: string;
}