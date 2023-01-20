import { TAuthTokens, TSystemUserPublic } from '../../../commons/types';
import { ISystemCompany } from '../../system_company/interfaces/system_company.interface'
export type TAuthLoginResponse = TAuthTokens & { systemUser: TSystemUserPublic, systemCompany: ISystemCompany };