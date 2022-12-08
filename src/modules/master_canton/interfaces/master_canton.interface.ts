import { IGeneralCommon } from "src/commons/interfaces/general_common.interface";
import { IMasterMaintenance } from "src/commons/interfaces/master_maintenance.interface";

export interface IMasterCanton extends IMasterMaintenance, IGeneralCommon{
    clm_id_master_state: number;
    clm_name: string;
}