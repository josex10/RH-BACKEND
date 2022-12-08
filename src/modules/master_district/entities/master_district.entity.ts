import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tbl_master_district')
export class MasterdistrictEntity {
    @PrimaryGeneratedColumn()
    clm_id: number;

    @Column()
    clm_id_master_canton: number;

    @Column()
    clm_name: string;

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