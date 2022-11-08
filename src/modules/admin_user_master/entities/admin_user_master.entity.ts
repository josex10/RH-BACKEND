import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tbl_admin_user_master')
export class AdminUserMaster {
    @PrimaryGeneratedColumn()
    clm_id: number;

    @Column()
    clm_username: string;

    @Column()
    clm_name: string;

    @Column()
    clm_lastname: string;

    @Column({ unique: true })
    clm_email: string;

    @Column()
    clm_password: string;

    @Column()
    clm_is_active: boolean;
}
