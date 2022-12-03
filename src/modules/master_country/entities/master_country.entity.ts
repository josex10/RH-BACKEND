import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tbl_master_country')
export class MasterCountryEntity {
    @PrimaryGeneratedColumn()
    clm_id: number;

    @Column()
    clm_shortname: string;

    @Column()
    clm_name: string;

    @Column()
    clm_currency_name: string;

    @Column()
    clm_currency_symbol: string;

    @Column()
    clm_currency_shortname: string;

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