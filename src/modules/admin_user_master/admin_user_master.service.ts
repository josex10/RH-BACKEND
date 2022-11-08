import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { IdParamAdminUserMasterDto } from './dto/id-param-admin_user_master.dto';
import { UpdateAdminUserMasterDto } from './dto/update-admin_user_master.dto';
import { AdminUserMaster } from './entities/admin_user_master.entity';

@Injectable()
export class AdminUserMasterService {

  constructor(@InjectRepository(AdminUserMaster) private adminUserMasterRepository: Repository<AdminUserMaster>){}

  findAll() {
    return this.adminUserMasterRepository.find({
      select: [
        "clm_id", 
        "clm_username",
        "clm_name",
        "clm_lastname",
        "clm_email",
        "clm_is_active"
      ]
    });
  }

  async findOne(params: IdParamAdminUserMasterDto) {

    const userFound = await this.queryGetMasterUserbyId(params.id);
    if (!userFound) {
      throw new HttpException('User Not Found!', HttpStatus.NOT_FOUND);
    }

    return userFound;
  }

  async update(params: IdParamAdminUserMasterDto, updateAdminUserMasterDto: UpdateAdminUserMasterDto) {

    const userFound = await this.queryGetUserMasterByEmail(updateAdminUserMasterDto.clm_email);

    if (userFound) {
      throw new HttpException('The email is already registered!', HttpStatus.CONFLICT);
    }

    const updateUser: UpdateResult =  await this.queryUpdateUserMasterById(params.id, updateAdminUserMasterDto);
    if (updateUser.affected === 0) {
      throw new HttpException('User Not Found'!, HttpStatus.NOT_FOUND);
    }
    return this.queryGetMasterUserbyId(params.id);
  }

  async activate(params: IdParamAdminUserMasterDto) {
    const activateUser = this.queryActivateDeactivateUserMasterById(params.id, true);

    if ((await activateUser).affected === 0) {
      throw new HttpException('User Not Found'!, HttpStatus.NOT_FOUND);
    }

    return this.queryGetMasterUserbyId(params.id);
  }

  async deactivate(params: IdParamAdminUserMasterDto) {
    const activateUser = this.queryActivateDeactivateUserMasterById(params.id, false);

    if ((await activateUser).affected === 0) {
      throw new HttpException('User Not Found'!, HttpStatus.NOT_FOUND);
    }

    return this.queryGetMasterUserbyId(params.id);
  }

  private queryGetMasterUserbyId(id: number){
    return this.adminUserMasterRepository.findOne({
      select: [
        "clm_id", 
        "clm_username",
        "clm_name",
        "clm_lastname",
        "clm_email",
        "clm_is_active"
      ],
      where: {
        clm_id: id,
      },
    });
  }

  private queryUpdateUserMasterById( id : number, updateUser: UpdateAdminUserMasterDto): Promise<UpdateResult>{
    return this.adminUserMasterRepository
    .createQueryBuilder()
    .update(AdminUserMaster)
    .set({ clm_name: updateUser.clm_name, clm_lastname: updateUser.clm_lastname, clm_email: updateUser.clm_email})
    .where("clm_id = :id", { id: id })
    .execute();
  }

  private queryActivateDeactivateUserMasterById( id : number, activate: boolean): Promise<UpdateResult>{
    return this.adminUserMasterRepository
    .createQueryBuilder()
    .update(AdminUserMaster)
    .set({ clm_is_active: activate})
    .where("clm_id = :id", { id: id })
    .execute();
  }

  queryGetUserMasterByEmail(email: string){
    return this.adminUserMasterRepository.findOne({
      where: {
        clm_email: email
      },
    });
  }

  queryGetMasterUserByUsername(username: string){
    return this.adminUserMasterRepository.findOne({
      select: [
        "clm_id", 
        "clm_username",
        "clm_name",
        "clm_lastname",
        "clm_email",
        "clm_is_active"
      ],
      where: {
        clm_username: username,
      },
    });
  }

}
