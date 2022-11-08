import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginMasterUserAuthDto {
    @IsNotEmpty()
    @IsEmail()
    clm_email: string;

    @IsNotEmpty()
    clm_password: string;
}
