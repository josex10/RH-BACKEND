import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MasterCantonEntity } from "./entities/master_canton.entity";
import { IMasterCanton } from "./interfaces/master_canton.interface";

@Injectable()
export class MasterCantonService {

    constructor(@InjectRepository(MasterCantonEntity) private masterCantonRepository: Repository<MasterCantonEntity>) {}

    /**
     * 
     * @description Get all Canton by state id
     * @returns IMasterState[]
     */
    fnFindByStateId = async(clm_id_master_state: number):Promise<IMasterCanton[]> =>{

        const groupOfMasterCanton: IMasterCanton[] = await this.masterCantonRepository.find({
            where: {
                clm_id_master_state
            }
        });

        return groupOfMasterCanton;
    }
}