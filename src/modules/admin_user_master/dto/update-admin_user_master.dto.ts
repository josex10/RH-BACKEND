import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminUserMasterDto } from './create-admin_user_master.dto';

export class UpdateAdminUserMasterDto extends PartialType(CreateAdminUserMasterDto) {
    clm_is_active?: boolean;
}
