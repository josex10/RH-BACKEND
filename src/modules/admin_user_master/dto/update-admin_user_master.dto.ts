import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateAdminUserMasterDto {
    @IsNotEmpty()
    clm_name: string;

    @IsNotEmpty()
    clm_lastname: string;

    @IsNotEmpty()
    @IsEmail()
    clm_email: string;
}
