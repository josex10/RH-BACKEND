import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class RegisterMasterUserAuthDto {
    
    @IsNotEmpty()
    @IsOptional()
    clm_username?: string;
    
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

