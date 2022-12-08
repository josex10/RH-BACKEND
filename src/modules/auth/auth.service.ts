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
import { SystemCompanyService } from '../system_company/system_company.service';
import { SystemCompanyRegisterAuthDto } from './dto/system_company_register_auth.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(MasterUserEntity) private MasterUserEntityRepository: Repository<MasterUserEntity>,
    @InjectRepository(SystemCompanyEntity) private systemCompanyEntityRepository: Repository<SystemCompanyEntity>,
    private jwtService: JwtService, 
    private MasterUserService: MasterUserService,
    private systemCompanyService: SystemCompanyService
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

    const newUsername = await this.fnGenerateUsernameForUserMaster(registerMasterUserAuthDto);

    registerMasterUserAuthDto = { ...registerMasterUserAuthDto, clm_username: newUsername };

    const newUser = this.MasterUserEntityRepository.create(registerMasterUserAuthDto);
    return this.MasterUserEntityRepository.save(newUser);
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
   * @param registerMasterUserAuthDto 
   * @description Function to generate dynamic usernames
   * @returns string
   */
  fnGenerateUsernameForUserMaster = async( registerMasterUserAuthDto: MasterUserRegisterAuthDto): Promise<string> =>{

    const splitname = registerMasterUserAuthDto.clm_name.split('');
    const splitLastname = registerMasterUserAuthDto.clm_lastname_1.split(' ');
    const domain = '@admin.com';
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
      const userFound = await this.MasterUserService.findByUsername(tmpUsername);
      let test = userFound;
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
