import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MasterUserEntity } from '../master_user/entities/master_user.entity';
import { RegisterMasterUserAuthDto } from './dto/register-user-master-auth.dto';
import { LoginMasterUserAuthDto } from './dto/login-user-master-auth.dto';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MasterUserService } from '../master_user/master_user.service';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(MasterUserEntity) private MasterUserEntityRepository: Repository<MasterUserEntity>,
    private jwtService: JwtService, 
    private MasterUserService: MasterUserService
    ){}

  async registerUserMaster( registerMasterUserAuthDto: RegisterMasterUserAuthDto) {

    const userFound = await this.MasterUserService.queryGetUserMasterByEmail(registerMasterUserAuthDto.clm_email);

    if (userFound) {
      throw new HttpException('The email is already registered!', HttpStatus.CONFLICT);
    }

    const { clm_password } = registerMasterUserAuthDto;
    const plainToHash = await hash(clm_password, 10);

    registerMasterUserAuthDto = { ...registerMasterUserAuthDto, clm_password: plainToHash };

    const newUsername = await this.fnGenerateUsernameForUserMaster(registerMasterUserAuthDto);

    registerMasterUserAuthDto = { ...registerMasterUserAuthDto, clm_username: newUsername };

    const newUser = this.MasterUserEntityRepository.create(registerMasterUserAuthDto);
    return this.MasterUserEntityRepository.save(newUser);
  }

  async loginUserMaster(loginMasterUserAuthDto:LoginMasterUserAuthDto){
    const  {clm_username, clm_password} = loginMasterUserAuthDto;
    const userFound = await this.MasterUserService.queryGetUserMasterByUserName(clm_username);

    if(!userFound) throw new HttpException('User Not Found!', HttpStatus.NOT_FOUND);
    if(!userFound.clm_is_active) throw new HttpException('User account disable.', HttpStatus.UNAUTHORIZED);

    const checkPassword = await compare(clm_password, userFound.clm_password);

    if(!checkPassword) throw new HttpException('Invalid password!', HttpStatus.CONFLICT);

    const payload = {clm_id: userFound.clm_id, clm_username: userFound.clm_username};
    const token = this.jwtService.sign(payload);
    
    const responseUser = await this.MasterUserService.findOne({id: userFound.clm_id});

    return {
      user: responseUser, 
      token
    }
  }

  private async fnGenerateUsernameForUserMaster( registerMasterUserAuthDto: RegisterMasterUserAuthDto){

    const splitname = registerMasterUserAuthDto.clm_name.split("");
    const splitLastname = registerMasterUserAuthDto.clm_lastname_1.split(" ");
    const domain = "@admin.com";
    let newUsername: string = `${splitname[0]}${splitLastname[0]}`;
    let newUserNameAvailable: boolean = false;
    let start: boolean = true;
    let randomNuber: number = 0;
    let tmpUsername: string = "";

    do {

      if(!start){
        randomNuber = Math.floor(Math.random() * 99);
        newUsername = `${newUsername}${randomNuber}`;
      }
      tmpUsername = `${newUsername}${domain}`.toLowerCase();
      const userFound = await this.MasterUserService.queryGetMasterUserByUsername(tmpUsername);
      if(!userFound) {
        newUserNameAvailable = true;
      }

      start = false;
      
    } while (!newUserNameAvailable);

    return tmpUsername;

  }
}
