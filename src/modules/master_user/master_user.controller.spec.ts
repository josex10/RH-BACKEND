import { Test, TestingModule } from '@nestjs/testing';
import { MasterUserController } from './master_user.controller';
import { MasterUserModule } from './master_user.module';
import { MasterUserService } from './master_user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MasterUserEntity } from './entities/master_user.entity';
import { UpdateMasterUserDto } from './dto/master_user_update.dto';

describe('Testing group for: MasterUserController', () => {
  let appController: MasterUserController;
  let mockMasterUserService = {
    update: jest.fn((dto) => {
      return dto
    })
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MasterUserController],
      providers: [
        MasterUserService, {provide: MasterUserService, useValue: mockMasterUserService}
      ]
    })
    .compile();

    appController = app.get<MasterUserController>(MasterUserController);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  it('should update master user', () => {
    const updateMasterUserDto: UpdateMasterUserDto = { 
      clm_id: 5,
      clm_name: 'Jose Manuel',
      clm_lastname_1: 'Badilla',
      clm_lastname_2: 'Porras',
      clm_email: 'josebp.10@hotmail.com'
    };

    const masterUserId = 5;

    expect(appController.update(updateMasterUserDto)).toEqual({ 
      clm_id: masterUserId,
      ...updateMasterUserDto,
    });
  });

  
});
