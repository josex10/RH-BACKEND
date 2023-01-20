export type TSystemSupplier = {
    clm_id: number;
    clm_id_system_company:  number;
    clm_id_master_state: number;
    clm_name: string;
    clm_email?: string;
    clm_phone?: string;
    clm_address?: string;
    clm_tax_number?: string;
    clm_description?: string;
    clm_is_active: boolean;
    clm_id_system_created_by: number;
    clm_created_at: Date;
    clm_id_system_updated_by: number;
    clm_updated_at: Date;
}