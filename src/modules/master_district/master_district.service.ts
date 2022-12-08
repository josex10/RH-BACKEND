import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MasterdistrictEntity } from "./entities/master_district.entity";
import { IMasterDistrict } from "./interfaces/master_district.interface";

@Injectable()
export class MasterDistrictService {

    constructor(@InjectRepository(MasterdistrictEntity) private masterdistrictRepository: Repository<MasterdistrictEntity>) {}

    /**
     * 
     * @description Get all District by canton id
     * @returns IMasterState[]
     */
    fnFindByCantonId = async(clm_id_master_canton: number):Promise<IMasterDistrict[]> =>{

        const groupOfMasterDistrict: IMasterDistrict[] = await this.masterdistrictRepository.find({
            where: {
                clm_id_master_canton
            }
        });

        return groupOfMasterDistrict;
    }
}