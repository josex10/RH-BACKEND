import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/commons/service.common";
import { Repository } from "typeorm";
import { MasterCountryEntity } from "./entities/master_country.entity";

@Injectable()
export class MasterCountryService extends BaseService<MasterCountryEntity> {

    constructor(@InjectRepository(MasterCountryEntity) private masterCountryRepository: Repository<MasterCountryEntity>) {
        super();
    }

    getRepository(): Repository<MasterCountryEntity> {
        return this.masterCountryRepository;
    }
}