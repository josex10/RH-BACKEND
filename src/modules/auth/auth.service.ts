import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MasterUserEntity } from '../master_user/entities/master_user.entity';
import { MasterUserRegisterAuthDto } from './dto/master_user_register_auth.dto';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MasterUserService } from '../master_user/master_user.service';
import { IMasterUser } from '../master_user/interfaces/master_user.interface';
import { SystemCompanyEntity } from '../system_company/entities/system_company.entity';
import { SystemCompanyRegisterAuthDto } from './dto/system_company_register_auth.dto';
import { SystemUserRegisterDto } from './dto/system_user_register_auth.dto';
import { EUserType } from './enums/auth.enums';
import { SystemUserService } from '../system_user/system_user.service';
import { SystemUserEntity } from '../system_user/entities/system_user.entity';
import { ISystemUserComplete } from '../system_user/interfaces/system_user.interface';
import { async } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(MasterUserEntity) private masterUserEntityRepository: Repository<MasterUserEntity>,
    @InjectRepository(SystemCompanyEntity) private systemCompanyEntityRepository: Repository<SystemCompanyEntity>,
    @InjectRepository(SystemUserEntity) private systemUserRepository: Repository<SystemUserEntity>,
    private jwtService: JwtService, 
    private masterUserService: MasterUserService,
    private systemUserService: SystemUserService
    ){}

  /**
   * 
   * @param registerMasterUserAuthDto 
   * @description Function to register a user into the DB
   * @returns IMasterUser
   */
  registerUserMaster = async (registerMasterUserAuthDto: MasterUserRegisterAuthDto): Promise<IMasterUser> => {

    const { clm_password } = registerMasterUserAuthDto;
    const plainToHash = await hash(clm_password, 10);

    registerMasterUserAuthDto = { ...registerMasterUserAuthDto, clm_password: plainToHash };

    const domain = this.fnGenerateDomains(EUserType.MASTER);

    const newUsername = await this.fnGenerateUserNames(registerMasterUserAuthDto, domain, EUserType.MASTER);

    registerMasterUserAuthDto = { ...registerMasterUserAuthDto, clm_username: newUsername };

    const newUser = this.masterUserEntityRepository.create(registerMasterUserAuthDto);
    return this.masterUserEntityRepository.save(newUser);
  }


  /**
   * 
   * @param registerSystemUserDto 
   * @description Function to register a user into the DB
   * @returns ISystemUserComplete
   */
  registerSystemUser = async (registerSystemUserDto: SystemUserRegisterDto): Promise<ISystemUserComplete> => {

    const { clm_password } = registerSystemUserDto;
    const plainToHash = await hash(clm_password, 10);

    registerSystemUserDto = { ...registerSystemUserDto, clm_password: plainToHash };

    const domain = this.fnGenerateDomains(EUserType.SYSTEM, registerSystemUserDto.clm_id_system_company);

    const newUsername = await this.fnGenerateUserNames(registerSystemUserDto, domain, EUserType.SYSTEM);

    registerSystemUserDto = { ...registerSystemUserDto, clm_username: newUsername };

    const newUser = this.systemUserRepository.create(registerSystemUserDto);
    return this.systemUserRepository.save(newUser);
  }

  /**
   * 
   * @param normalPassword 
   * @param encryptedPassword 
   * @description Function to compare normal password with the encripted password stored on the DB
   * @returns boolean
   */
  fnComparePassword = async(normalPassword: string, encryptedPassword: string): Promise<boolean> => {
    return await compare(normalPassword, encryptedPassword);
  }

  /**
   * 
   * @param masterUser 
   * @description Function to create the token for master user
   * @returns string
   */
  fnCreateTokerForMasterUser = (masterUser: IMasterUser): string => {
    const payload = {clm_id: masterUser.clm_id, clm_username: masterUser.clm_username};
    return  this.jwtService.sign(payload);
  }

  /**
   * 
   * @param systemUser 
   * @description Function to create the token for system user
   * @returns string
   */
  fnCreateTokerForSystemUser = (systemUser: ISystemUserComplete): string => {
    const payload = {
      clm_id: systemUser.clm_id, 
      clm_username: systemUser.clm_username,
      clm_email: systemUser.clm_email,
    };
    return  this.jwtService.sign(payload);
  }

  /**
   * 
   * @param userType 
   * @param companyId 
   * @description Function to generate users domains based on EUserType
   * @returns string
   */
  fnGenerateDomains = (userType: EUserType, companyId: number = null): string =>{
    let returnDomain: string = "";
    if(userType === EUserType.MASTER){
      returnDomain = '@admin.com';
    } else if(userType === EUserType.SYSTEM){
      returnDomain = `@${companyId}.restaurant-helper.com`;
    }
    return returnDomain;
  }



  /**
   * 
   * @param registerMasterUserAuthDto 
   * @description Function to generate dynamic usernames
   * @returns string
   */
  fnGenerateUserNames = async( newRegister: MasterUserRegisterAuthDto | SystemUserRegisterDto, domain: string,  userType: EUserType): Promise<string> =>{

    const splitname = newRegister.clm_name.split('');
    const splitLastname = newRegister.clm_lastname_1.split(' ');

    let newUsername: string = `${splitname[0]}${splitLastname[0]}`;
    let newUserNameAvailable: boolean = false;
    let start: boolean = true;
    let randomNuber: number = 0;
    let tmpUsername: string = '';

    do {

      if(!start){
        randomNuber = Math.floor(Math.random() * 99);
        newUsername = `${newUsername}${randomNuber}`;
      }
      tmpUsername = `${newUsername}${domain}`.toLowerCase();
      let userFound: any;
      if(userType === EUserType.MASTER){
        userFound = await this.masterUserService.findByUsername(tmpUsername);
      } else {
        userFound = await this.systemUserService.findByUsername(tmpUsername);
      }

      if(!userFound.length) {
        newUserNameAvailable = true;
      }

      start = false;
      
    } while (!newUserNameAvailable);

    return tmpUsername;

  }

  /**
   * 
   * @param systemCompanyRegisterAuthDto 
   * @description Function to register a company into the DB
   * @returns SystemCompanyRegisterAuthDto
   */
   fnSystemCompanyRegister = 
    async (systemCompanyRegisterAuthDto: SystemCompanyRegisterAuthDto): Promise<SystemCompanyRegisterAuthDto> => {
      const newSystemCompany = this.systemCompanyEntityRepository.create(systemCompanyRegisterAuthDto);
      return await this.systemCompanyEntityRepository.save(newSystemCompany);
  }
}
