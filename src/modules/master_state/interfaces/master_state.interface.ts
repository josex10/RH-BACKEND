import { IGeneralCommon } from "src/commons/interfaces/general_common.interface";
import { IMasterMaintenance } from "src/commons/interfaces/master_maintenance.interface";

export interface IMasterState extends IMasterMaintenance, IGeneralCommon{
    clm_id_master_country: number;
    clm_name: string;
}