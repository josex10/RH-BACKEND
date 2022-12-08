import { IGeneralCommon } from "src/commons/interfaces/general_common.interface";
import { IMasterMaintenance } from "src/commons/interfaces/master_maintenance.interface";

export interface IMasterDistrict extends IMasterMaintenance, IGeneralCommon {
    clm_id_master_canton: number;
    clm_name: string;
}