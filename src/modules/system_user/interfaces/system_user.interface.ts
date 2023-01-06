import { OmitType } from "@nestjs/mapped-types";

export interface ISystemUserComplete {
    clm_id: number;
    clm_id_system_company: number;
    clm_name: string;
    clm_lastname_1: string;
    clm_lastname_2: string;
    clm_username: string;
    clm_email: string;
    clm_password: string;
    clm_first_login: boolean;
    clm_main_account: boolean;
    clm_is_active: boolean;
    clm_id_system_created_by: number;
    clm_created_at: Date;
    clm_id_system_updated_by: number;
    clm_updated_at: Date;
}

export interface ISystemUserWithoutPassword extends Omit<ISystemUserComplete, 'clm_password'>{}