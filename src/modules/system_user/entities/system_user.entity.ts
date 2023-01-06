import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tbl_system_user')
export class SystemUserEntity {
    @PrimaryGeneratedColumn()
    clm_id: number;

    @Column()
    clm_id_system_company: number;

    @Column()
    clm_name: string;

    @Column()
    clm_lastname_1: string;

    @Column()
    clm_lastname_2: string;

    @Column({ unique: true })
    clm_username: string;

    @Column({ unique: true })
    clm_email: string;

    @Column()
    clm_password: string;
    @Column()
    clm_first_login: boolean;

    @Column()
    clm_main_account: boolean;

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
}
