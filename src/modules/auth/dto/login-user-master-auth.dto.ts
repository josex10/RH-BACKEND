import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginMasterUserAuthDto {
    @IsNotEmpty()
    @IsEmail()
    clm_username: string;

    @IsNotEmpty()
    clm_password: string;
}
