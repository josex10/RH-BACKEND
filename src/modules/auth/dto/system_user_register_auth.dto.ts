import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SystemUserRegisterDto {

    @IsNumber()
    @IsNotEmpty()
    clm_id_system_company: number;

    clm_username?: string;

    @IsString()
    @IsNotEmpty()
    clm_name: string;

    @IsString()
    @IsNotEmpty()
    clm_lastname_1: string;

    @IsString()
    @IsNotEmpty()
    clm_lastname_2: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    clm_email: string;

    @IsString()
    @IsNotEmpty()
    clm_password: string;

}