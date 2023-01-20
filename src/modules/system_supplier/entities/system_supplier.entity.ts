import { MasterStateEntity } from "src/modules/master_state/entities";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('tbl_system_supplier')
export class SystemSupplierEntity {
    @PrimaryGeneratedColumn()
    clm_id: number;

    @Column()
    clm_id_system_company:  number;

    @Column()
    clm_id_master_state: number;
    
    @Column()
    clm_name: string;

    @Column({ nullable: true })
    clm_email?: string;

    @Column({ nullable: true })
    clm_phone?: string;

    @Column({ nullable: true })
    clm_address?: string;

    @Column({ nullable: true })
    clm_tax_number?: string;

    @Column({ nullable: true })
    clm_description?: string;

    @Column()
    clm_is_active: boolean;

    @Column()
    clm_id_system_created_by: number;

    @Column()
    clm_created_at: Date;

    @Column()
    clm_id_system_updated_by: number;

    @Column()
    clm_updated_at: Date;

    @ManyToOne(() => MasterStateEntity, (masterState) => masterState.supplier)
    @JoinColumn({ name: "clm_id_master_state", referencedColumnName: "clm_id" })
    state: MasterStateEntity
}