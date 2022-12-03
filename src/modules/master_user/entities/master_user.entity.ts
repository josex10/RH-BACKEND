import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tbl_master_user')
export class MasterUserEntity {
    @PrimaryGeneratedColumn()
    clm_id: number;

    @Column()
    clm_username: string;

    @Column()
    clm_name: string;

    @Column()
    clm_lastname_1: string;

    @Column()
    clm_lastname_2: string;

    @Column({ unique: true })
    clm_email: string;

    @Column()
    clm_password: string;

    @Column()
    clm_is_active: boolean;
}
