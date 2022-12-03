import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { IdParamMasterUserDto } from './dto/master_user _id_param.dto';
import { UpdateMasterUserDto } from './dto/master_user_update.dto';
import { MasterUserEntity } from './entities/master_user.entity';

@Injectable()
export class MasterUserService {

  constructor(@InjectRepository(MasterUserEntity) private MasterUserEntityRepository: Repository<MasterUserEntity>){}

  findAll() {
    return this.MasterUserEntityRepository.find({
      select: [
        "clm_id", 
        "clm_username",
        "clm_name",
        "clm_lastname_1",
        "clm_lastname_2",
        "clm_email",
        "clm_is_active"
      ]
    });
  }

  async findOne(params: IdParamMasterUserDto) {

    const userFound = await this.queryGetMasterUserbyId(params.id);
    if (!userFound) {
      throw new HttpException('User Not Found!', HttpStatus.NOT_FOUND);
    }

    return userFound;
  }

  async update(params: IdParamMasterUserDto, UpdateMasterUserDto: UpdateMasterUserDto) {

    const userFound = await this.queryGetUserMasterByEmail(UpdateMasterUserDto.clm_email);

    if (userFound) {
      throw new HttpException('The email is already registered!', HttpStatus.CONFLICT);
    }

    const updateUser: UpdateResult =  await this.queryUpdateUserMasterById(params.id, UpdateMasterUserDto);
    if (updateUser.affected === 0) {
      throw new HttpException('User Not Found'!, HttpStatus.NOT_FOUND);
    }
    return this.queryGetMasterUserbyId(params.id);
  }

  async activate(params: IdParamMasterUserDto) {
    const activateUser = this.queryActivateDeactivateUserMasterById(params.id, true);

    if ((await activateUser).affected === 0) {
      throw new HttpException('User Not Found'!, HttpStatus.NOT_FOUND);
    }

    return this.queryGetMasterUserbyId(params.id);
  }

  async deactivate(params: IdParamMasterUserDto) {
    const activateUser = this.queryActivateDeactivateUserMasterById(params.id, false);

    if ((await activateUser).affected === 0) {
      throw new HttpException('User Not Found'!, HttpStatus.NOT_FOUND);
    }

    return this.queryGetMasterUserbyId(params.id);
  }

  private queryGetMasterUserbyId(id: number){
    return this.MasterUserEntityRepository.findOne({
      select: [
        "clm_id", 
        "clm_username",
        "clm_name",
        "clm_lastname_1",
        "clm_lastname_2",
        "clm_email",
        "clm_is_active"
      ],
      where: {
        clm_id: id,
      },
    });
  }

  private queryUpdateUserMasterById( id : number, updateUser: UpdateMasterUserDto): Promise<UpdateResult>{
    return this.MasterUserEntityRepository
    .createQueryBuilder()
    .update(MasterUserEntity)
    .set({ clm_name: updateUser.clm_name, clm_lastname_1: updateUser.clm_lastname_1, clm_lastname_2: updateUser.clm_lastname_2, clm_email: updateUser.clm_email})
    .where("clm_id = :id", { id: id })
    .execute();
  }

  private queryActivateDeactivateUserMasterById( id : number, activate: boolean): Promise<UpdateResult>{
    return this.MasterUserEntityRepository
    .createQueryBuilder()
    .update(MasterUserEntity)
    .set({ clm_is_active: activate})
    .where("clm_id = :id", { id: id })
    .execute();
  }

  queryGetUserMasterByEmail(email: string){
    return this.MasterUserEntityRepository.findOne({
      where: {
        clm_email: email
      },
    });
  }

  queryGetUserMasterByUserName(username: string){
    return this.MasterUserEntityRepository.findOne({
      where: {
        clm_username: username
      },
    });
  }

  queryGetMasterUserByUsername(username: string){
    return this.MasterUserEntityRepository.findOne({
      select: [
        "clm_id", 
        "clm_username",
        "clm_name",
        "clm_lastname_1",
        "clm_lastname_2",
        "clm_email",
        "clm_is_active"
      ],
      where: {
        clm_username: username,
      },
    });
  }

}
