import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class RegisterMasterUserAuthDto {
    @ApiProperty()
    clm_username?: string;
    
    @ApiProperty()
    @IsNotEmpty()
    clm_name: string;

    @ApiProperty()
    @IsNotEmpty()
    clm_lastname_1: string;

    @ApiProperty()
    @IsNotEmpty()
    clm_lastname_2: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    clm_email: string;

    @ApiProperty()
    @IsNotEmpty()
    clm_password: string;
}

