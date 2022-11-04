import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateAdminUserMasterDto {
    @IsNotEmpty()
    clm_name: string;

    @IsNotEmpty()
    clm_lastname: string;

    @IsNotEmpty()
    @IsEmail()
    clm_email: string;

    @IsNotEmpty()
    clm_password: string;
}
