import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateSystemUserDto {

    @IsNumber()
    @IsNotEmpty()
    clm_id: number;

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

}
