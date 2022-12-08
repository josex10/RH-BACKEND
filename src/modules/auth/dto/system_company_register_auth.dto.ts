import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, isString, MaxLength, MinLength } from "class-validator";

export class SystemCompanyRegisterAuthDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    clm_id_identification_type: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    clm_id_master_country: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    clm_id_master_state: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    clm_id_master_canton: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    clm_id_master_district: number;

    @ApiProperty()
    @IsString()
    @MinLength(7)
    @MaxLength(30)
    @IsNotEmpty()
    clm_identification_number: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(120)
    clm_company_name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(15)
    clm_phone: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(120)
    clm_email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(120)
    clm_address: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    clm_id_master_created_by: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    clm_id_master_updated_by: number;
}

