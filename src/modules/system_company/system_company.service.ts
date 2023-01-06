import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SystemCompanyEntity } from "./entities/system_company.entity";
import { ISystemCompany } from "./interfaces/system_company.interface";

@Injectable()
export class SystemCompanyService {

  constructor(@InjectRepository(SystemCompanyEntity) private systemCompanyEntityRepository: Repository<SystemCompanyEntity>){}
  
  /**
   * 
   * @param email 
   * @description Get single System Company from the DB by email
   * @returns ISystemCompany[]
   */
  fnFindByEmail = async(clm_email: string):Promise<ISystemCompany[]> =>{

    const groupOfSystemCompany: ISystemCompany[] = await this.systemCompanyEntityRepository.find({
      where: {
        clm_email
      }
    });

    return groupOfSystemCompany;
  }

  /**
   * 
   * @param clm_company_name 
   * @description Get single System Company from the DB by company name
   * @returns ISystemCompany[]
   */
  fnFindByCompanyName = async(clm_company_name: string):Promise<ISystemCompany[]> =>{

    const groupOfSystemCompany: ISystemCompany[] = await this.systemCompanyEntityRepository.find({
      where: {
        clm_company_name
      }
    });

    return groupOfSystemCompany;
  }

  /**
   * 
   * @param clm_id
   * @description Get single System Company from the DB by company id
   * @returns ISystemCompany[]
   */
  fnFindByCompanyId = async(clm_id: number):Promise<ISystemCompany[]> =>{

    const groupOfSystemCompany: ISystemCompany[] = await this.systemCompanyEntityRepository.find({
      where: {
        clm_id
      }
    });

    return groupOfSystemCompany;
  }

  /**
   * 
   * @param clm_identification_number 
   * @description Get single System Company from the DB by identification number and identification type
   * @returns ISystemCompany[]
   */
   fnFindByIdentificationNumberAndType = async( clm_id_identification_type: number, clm_identification_number: string):Promise<ISystemCompany[]> =>{

    const groupOfSystemCompany: ISystemCompany[] = await this.systemCompanyEntityRepository.find({
      where: {
        clm_id_identification_type,
        clm_identification_number
      }
    });

    return groupOfSystemCompany;
  }
}