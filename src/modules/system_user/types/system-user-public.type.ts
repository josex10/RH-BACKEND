import { TSystemUser } from "../../../commons/types";


export type TSystemUserPublic = Omit<TSystemUser, 'clm_password' | 'clm_rf_hash'>;