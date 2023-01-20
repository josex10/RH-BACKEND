import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SystemSupplierCreateDto {
    @IsNumber()
    @IsNotEmpty()
    clm_id_system_company:  number;

    @IsNumber()
    @IsNotEmpty()
    clm_id_master_state: number;

    @IsString()
    @IsNotEmpty()
    clm_name: string;

    @IsString()
    @IsEmail()
    @IsOptional()
    clm_email?: string;

    @IsString()
    @IsOptional()
    clm_phone?: string;

    @IsString()
    @IsOptional()
    clm_address?: string;

    @IsString()
    @IsOptional()
    clm_tax_number?: string;

    @IsString()
    @IsOptional()
    clm_description?: string;

    @IsOptional()
    clm_id_system_created_by: number;
}