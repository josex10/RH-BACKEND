import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tbl_system_company')
export class SystemCompanyEntity {
    @PrimaryGeneratedColumn()
    clm_id: number;

    @Column()
    clm_id_identification_type: number;

    @Column()
    clm_id_master_country: number;

    @Column()
    clm_id_master_state: number;

    @Column()
    clm_id_master_canton: number;

    @Column()
    clm_id_master_district: number;

    @Column()
    clm_identification_number: string;

    @Column({ unique: true })
    clm_company_name: string;

    @Column()
    clm_phone: string;

    @Column({ unique: true })
    clm_email: string;

    @Column()
    clm_address: string;

    @Column()
    clm_is_active: boolean;

    @Column()
    clm_id_master_created_by: number;

    @Column()
    clm_created_at: Date;

    @Column()
    clm_id_master_updated_by: number;

    @Column()
    clm_updated_at: Date;
}
