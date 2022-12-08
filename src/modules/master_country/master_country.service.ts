import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MasterCountryEntity } from "./entities/master_country.entity";
import { IMasterCountry } from "./interfaces/master_country.interface";

@Injectable()
export class MasterCountryService {

    constructor(@InjectRepository(MasterCountryEntity) private masterCountryRepository: Repository<MasterCountryEntity>) {}


/**
   * 
   * @description Get all countries
   * @returns IMasterCountry[]
   */
   fnFindAll = async():Promise<IMasterCountry[]> =>{

    const groupOfMasterCountry: IMasterCountry[] = await this.masterCountryRepository.find();

    return groupOfMasterCountry;
  }
    
}