import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MasterIdentificationTypeEntity } from "./entities/master_identification_type.entity";
import { IMasterIdentificationType } from "./interfaces/master_identification_type.interface";

@Injectable()
export class MasterIdentificacionTypeService {

    constructor(@InjectRepository(MasterIdentificationTypeEntity) private masterIdentificationTypeRepository: Repository<MasterIdentificationTypeEntity>) {}

    /**
     * 
     * @description Get all Master identification types by id
     * @returns IMasterIdentificationType[]
     */
    fnFindById = async(clm_id: number):Promise<IMasterIdentificationType[]> =>{

        const groupOfMasterIdentificationTypes: IMasterIdentificationType[] = await this.masterIdentificationTypeRepository.find({
            where: {
                clm_id
            }
        });

        return groupOfMasterIdentificationTypes;
    }

    /**
     * 
     * @description Get all Master identification types
     * @returns IMasterIdentificationType[]
     */
     fnFindAll = async():Promise<IMasterIdentificationType[]> =>{
        const groupOfMasterIdentificationTypes: IMasterIdentificationType[] = await this.masterIdentificationTypeRepository.find();
        return groupOfMasterIdentificationTypes;
    }
}