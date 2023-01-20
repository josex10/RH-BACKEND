import { SystemSupplierEntity } from "../../system_supplier/entities";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('tbl_master_state')
export class MasterStateEntity {
    @PrimaryGeneratedColumn()
    clm_id: number;

    @Column()
    clm_id_master_country: number;

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

    @OneToMany(() => SystemSupplierEntity, (systemUserSupplier) => systemUserSupplier.clm_id_master_state)
    supplier: SystemSupplierEntity[];

}