import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SystemSupplierEditDto{
   
    @IsNumber()
    @IsNotEmpty()
    clm_id: number;

    @IsNumber()
    @IsNotEmpty()
    clm_id_system_company:  number;

    @IsNumber()
    @IsNotEmpty()
    clm_id_master_state: number;

    @IsString()
    @IsNotEmpty()
    clm_name: string;

    @IsOptional()
    clm_email?: string;

    @IsOptional()
    clm_phone?: string;

    @IsOptional()
    clm_address?: string;

    @IsOptional()
    clm_tax_number?: string;

    @IsOptional()
    clm_description?: string;

    @IsOptional()
    clm_id_system_created_by: number;

    @IsNotEmpty()
    @IsBoolean()
    clm_is_active: boolean;

    @IsOptional()
    clm_id_system_updated_by: number;
}