import { IsEmail, IsNotEmpty } from "class-validator";

export class AnyUserLoginAuthDto {
    @IsNotEmpty()
    @IsEmail()
    clm_username: string;
    
    @IsNotEmpty()
    clm_password: string;
}
