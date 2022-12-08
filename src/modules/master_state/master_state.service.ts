import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MasterStateEntity } from "./entities/master_state.entity";
import { IMasterState } from "./interfaces/master_state.interface";

@Injectable()
export class MasterStateService {

    constructor(@InjectRepository(MasterStateEntity) private masterStateRepository: Repository<MasterStateEntity>) {}

    /**
     * 
     * @description Get all States by couuntry id
     * @returns IMasterState[]
     */
    fnFindByCountryId = async(clm_id_master_country: number):Promise<IMasterState[]> =>{

        const groupOfMasterCountry: IMasterState[] = await this.masterStateRepository.find({
            where: {
                clm_id_master_country
            }
        });

        return groupOfMasterCountry;
    }
}