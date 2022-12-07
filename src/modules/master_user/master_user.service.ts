import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { UpdateMasterUserDto } from './dto/master_user_update.dto';
import { MasterUserEntity } from './entities/master_user.entity';
import { IMasterUser, IMasterUserReturn } from './interfaces/master_user.interface';

@Injectable()
export class MasterUserService {

  constructor(@InjectRepository(MasterUserEntity) private MasterUserEntityRepository: Repository<MasterUserEntity>){}

  /**
   * @description Get all master users from the Database
   * @returns IMasterUser[]
   */
  findAll = async(): Promise<IMasterUserReturn[]> => {

    const arraryOfUsers: IMasterUser[] = await this.MasterUserEntityRepository.find();

    if(!arraryOfUsers.length){
      return arraryOfUsers;
    }

    return this.fnReturnMasterUser(arraryOfUsers);
  }

  /**
   * 
   * @param id 
   * @description Get single Master User from the DB by id
   * @returns IMasterUserReturn[]
   */
  findById = async(id: number):Promise<IMasterUserReturn[]> => { 

    const arraryOfUsers: IMasterUser[] = await this.MasterUserEntityRepository.find({
      where: {
        clm_id: id
      }
    });

    if(!arraryOfUsers.length){
      return arraryOfUsers;
    }

    return this.fnReturnMasterUser(arraryOfUsers);
  }

  /**
   * 
   * @param email 
   * @description Get single Master User from the DB by email
   * @returns IMasterUserReturn[]
   */
  findByEmail = async(email: string):Promise<IMasterUserReturn[]> =>{

    const arraryOfUsers: IMasterUser[] = await this.MasterUserEntityRepository.find({
      where: {
        clm_email: email,
      }
    });

    if(!arraryOfUsers.length){
      return arraryOfUsers;
    }

    return this.fnReturnMasterUser(arraryOfUsers);
  }

  /**
   * 
   * @param username 
   * @description Get single Master User from the DB by username
   * @returns IMasterUserReturn[]
   */
  findByUsername = async(username: string):Promise<IMasterUserReturn[]> =>{

      const arraryOfUsers: IMasterUser[] = await this.MasterUserEntityRepository.find({
        where: {
          clm_username: username,
        }
      });
  
      if(!arraryOfUsers.length){
        return arraryOfUsers;
      }
  
      return this.fnReturnMasterUser(arraryOfUsers);
  }

  /**
   * 
   * @param username 
   * @description Get single Master User from the DB by username
   * @returns IMasterUserReturn[]
   */
   findByUsernameForLogin = async(username: string):Promise<IMasterUser> =>{

    const arraryOfUsers: IMasterUser = await this.MasterUserEntityRepository.findOne({
      where: {
        clm_username: username,
      }
    });

    return arraryOfUsers;
  }

  /**
   * 
   * @param updateMasterUserDto 
   * @description Update Master User by id
   * @returns 
   */
  update = async(updateMasterUserDto: UpdateMasterUserDto): Promise<UpdateResult> => {
    return this.MasterUserEntityRepository
    .createQueryBuilder()
    .update(MasterUserEntity)
    .set(
      { clm_name: updateMasterUserDto.clm_name, 
        clm_lastname_1: updateMasterUserDto.clm_lastname_1, 
        clm_lastname_2: updateMasterUserDto.clm_lastname_2, 
        clm_email: updateMasterUserDto.clm_email})
    .where('clm_id = :id', { id: updateMasterUserDto.clm_id })
    .execute();
  }

  /**
   * 
   * @param id 
   * @param activate 
   * @description Update the status of the master user (activated/deactivated)
   * @returns UpdateResult
   */
  updateStatusById = async( id : number, activate: boolean): Promise<UpdateResult> => {
    return this.MasterUserEntityRepository
    .createQueryBuilder()
    .update(MasterUserEntity)
    .set({ clm_is_active: activate})
    .where('clm_id = :id', { id: id })
    .execute();
  }

  /**
   * 
   * @param masterUsers[]
   * @description Convert the Master User from the db to new instance for removing filds not need on the UI
   * @returns IMasterUserReturn[] 
   */
  fnReturnMasterUser(masterUsers: IMasterUser[] ) : IMasterUserReturn[]{
    return masterUsers.map( masterUser => {
      const {clm_password, ...tmpmMasterUser} = masterUser;
      return tmpmMasterUser;
    });
  }

}
