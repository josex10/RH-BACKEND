import { IGeneralCommon } from "src/commons/interfaces/general_common.interface";
import { IMasterMaintenance } from "src/commons/interfaces/master_maintenance.interface";

export interface IMasterIdentificationType extends IMasterMaintenance, IGeneralCommon{
    clm_name: string;
    clm_description: string;
}