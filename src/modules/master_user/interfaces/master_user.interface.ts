import { IGeneralCommon } from "src/commons/interfaces/general_common.interface";

export interface IMasterUserReturn extends IGeneralCommon {
    clm_username: string;
    clm_name: string;
    clm_lastname_1: string;
    clm_lastname_2: string;
    clm_email: string;
}

export interface IMasterUser extends IMasterUserReturn{
    clm_password: string;
}

