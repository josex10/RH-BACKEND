export interface IMasterUser {
    clm_id: number;
    clm_username: string;
    clm_name: string;
    clm_lastname_1: string;
    clm_lastname_2: string;
    clm_email: string;
    clm_password: string;
    clm_is_active: boolean;
}

export interface IMasterUserReturn {
    clm_id: number;
    clm_username: string;
    clm_name: string;
    clm_lastname_1: string;
    clm_lastname_2: string;
    clm_email: string;
    clm_is_active: boolean;
}