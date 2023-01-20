import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TSystemUser, TSystemUserPublic } from 'src/commons/types';
import { Repository, UpdateResult } from 'typeorm';
import { EGeneralActive } from '../../commons/enums';
import { UpdateSystemUserDto } from './dto/system_user_update.dto';
import { SystemUserEntity } from './entities/system_user.entity';
import { ISystemUserComplete, ISystemUserWithoutPassword } from './interfaces/system_user.interface';

@Injectable()
export class SystemUserService {

  constructor(@InjectRepository(SystemUserEntity) private systemUserRepository: Repository<SystemUserEntity>){}


  /*****
   * NEW VERSION
   */

  helperConverSystemUserToPublicSystemUser = (systemUser: TSystemUser): TSystemUserPublic =>{
    const {clm_password, clm_rf_hash, ...tmpSystemUser} = systemUser;
    return tmpSystemUser;
  }

  fnFindSystemUserByUsernameAndActive = async(clm_username: string, activeField: EGeneralActive): Promise<TSystemUser> =>{
    return await this.systemUserRepository.findOne({
      where: [{
        clm_username: clm_username,
        clm_is_active: (activeField === EGeneralActive.ACTIVE)? true : false
      }]

    });
  }

  fnFindSystemUserByIdAndActive = async(clm_id: number, activeField: EGeneralActive): Promise<TSystemUser> =>{
    return await this.systemUserRepository.findOne({
      where: [{
        clm_id: clm_id,
        clm_is_active: (activeField === EGeneralActive.ACTIVE)? true : false
      }]

    });
  }


  /*****
   * END NEW VERSION
   */















  /**
   * @description Get all system users from the Database
   * @returns ISystemUserWithoutPassword[]
   */
  findAll = async(): Promise<ISystemUserWithoutPassword[]> => {

    const arraryOfUsers: ISystemUserComplete[] = await this.systemUserRepository.find();

    if(!arraryOfUsers.length){
      return arraryOfUsers;
    }

    return this.fnReturnSystemUser(arraryOfUsers);
  }

  /**
   * 
   * @param id 
   * @description Get single System User from the DB by id
   * @returns ISystemUserWithoutPassword[]
   */
  findById = async(id: number):Promise<ISystemUserWithoutPassword[]> => { 

    const arraryOfUsers: ISystemUserComplete[] = await this.systemUserRepository.find({
      where: {
        clm_id: id
      }
    });

    if(!arraryOfUsers.length){
      return arraryOfUsers;
    }

    return this.fnReturnSystemUser(arraryOfUsers);
  }

  /**
   * 
   * @param email 
   * @description Get single System User from the DB by email
   * @returns ISystemUserWithoutPassword[]
   */
  findByEmail = async(email: string):Promise<ISystemUserWithoutPassword[]> =>{

    const arraryOfUsers: ISystemUserComplete[] = await this.systemUserRepository.find({
      where: {
        clm_email: email,
      }
    });

    if(!arraryOfUsers.length){
      return arraryOfUsers;
    }

    return this.fnReturnSystemUser(arraryOfUsers);
  }


  /**
   * 
   * @param email 
   * @description Get single System User from the DB by email and company id
   * @returns ISystemUserWithoutPassword[]
   */
  findByEmailAndCompanyId = async(email: string, companyId: number):Promise<ISystemUserWithoutPassword[]> =>{

    const arraryOfUsers: ISystemUserComplete[] = await this.systemUserRepository.find({
      where: {
        clm_email: email,
        clm_id_system_company: companyId,
      }
    });

    if(!arraryOfUsers.length){
      return arraryOfUsers;
    }

    return this.fnReturnSystemUser(arraryOfUsers);
  }

  /**
   * 
   * @param username 
   * @description Get single System User from the DB by username
   * @returns ISystemUserWithoutPassword[]
   */
  findByUsername = async(username: string):Promise<ISystemUserWithoutPassword[]> =>{

      const arraryOfUsers: ISystemUserComplete[] = await this.systemUserRepository.find({
        where: {
          clm_username: username,
        }
      });
  
      if(!arraryOfUsers.length){
        return arraryOfUsers;
      }
  
      return this.fnReturnSystemUser(arraryOfUsers);
  }

  /**
   * 
   * @param username 
   * @description Get single System User from the DB by username
   * @returns ISystemUserComplete
   */
  findByUsernameForLogin = async(username: string):Promise<ISystemUserComplete> =>{

    const systemUser: ISystemUserComplete = await this.systemUserRepository.findOne({
      where: {
        clm_username: username,
      }
    });

    return systemUser;
  }

  /**
   * 
   * @param updateMasterUserDto 
   * @description Update System User by id
   * @returns UpdateResult
   */
  update = async(updateSystemUserDto: UpdateSystemUserDto): Promise<UpdateResult> => {
    return this.systemUserRepository
    .createQueryBuilder()
    .update(SystemUserEntity)
    .set(
      { clm_name: updateSystemUserDto.clm_name, 
        clm_lastname_1: updateSystemUserDto.clm_lastname_1, 
        clm_lastname_2: updateSystemUserDto.clm_lastname_2, 
        clm_email: updateSystemUserDto.clm_email})
    .where('clm_id = :id', { id: updateSystemUserDto.clm_id })
    .execute();
  }

  /**
   * 
   * @param id 
   * @param activate 
   * @description Update the status of the system user (activated/deactivated)
   * @returns UpdateResult
   */
  updateStatusById = async( id : number, activate: boolean): Promise<UpdateResult> => {
    return this.systemUserRepository
    .createQueryBuilder()
    .update(SystemUserEntity)
    .set({ clm_is_active: activate})
    .where('clm_id = :id', { id: id })
    .execute();
  }

  /**
   * 
   * @param id 
   * @description Deactivate the first loging of the system user
   * @returns UpdateResult
   */
  removeFirstLoginOfTheSystemUserById = async( id : number): Promise<UpdateResult> => {
    return this.systemUserRepository
    .createQueryBuilder()
    .update(SystemUserEntity)
    .set({ clm_first_login: false})
    .where('clm_id = :id', { id: id })
    .execute();
  }

  /**
   * 
   * @param ISystemUserComplete[]
   * @description Convert the System User complete from the db to new instance for removing filds not need on the UI
   * @returns ISystemUserWithoutPassword[] 
   */
  fnReturnSystemUser(systemUsers: ISystemUserComplete[] ) : ISystemUserWithoutPassword[]{
    return systemUsers.map( systemUser => {
      const {clm_password, ...tmpSystemUser} = systemUser;
      return tmpSystemUser;
    });
  }



}
