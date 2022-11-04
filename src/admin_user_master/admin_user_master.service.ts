import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdminUserMasterDto } from './dto/create-admin_user_master.dto';
import { UpdateAdminUserMasterDto } from './dto/update-admin_user_master.dto';
import { AdminUserMaster } from './entities/admin_user_master.entity';

@Injectable()
export class AdminUserMasterService {

  constructor(@InjectRepository(AdminUserMaster) private adminUserMasterRepository: Repository<AdminUserMaster>){}

  async create(createAdminUserMasterDto: CreateAdminUserMasterDto) {

    const userFound = await this.adminUserMasterRepository.findOne({
      where: { clm_email: createAdminUserMasterDto.clm_email },
    });

    if (userFound) {
      return new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    
    const newUser = this.adminUserMasterRepository.create(createAdminUserMasterDto);
    return this.adminUserMasterRepository.save(newUser);
  }

  findAll() {
    return this.adminUserMasterRepository.find();
  }

  async findOne(id: number) {
    const userFound = await this.adminUserMasterRepository.findOne({
      where: {
        clm_id: id,
      },
    });

    if (!userFound) {
      return new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }

    return userFound;
  }

  async update(id: number, updateAdminUserMasterDto: UpdateAdminUserMasterDto) {
    const userFound = await this.adminUserMasterRepository.findOne({
      where: {
        clm_id: id,
      },
    });

    if (!userFound) {
      return new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }

    const updateUser = Object.assign(userFound, updateAdminUserMasterDto);

    return this.adminUserMasterRepository.save(updateUser);
  }

  async remove(id: number) {
    const userDeleted = this.adminUserMasterRepository.delete({ clm_id: id });

    if ((await userDeleted).affected === 0) {
      return new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }

    return userDeleted;
  }
}
