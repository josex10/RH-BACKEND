import { Controller } from "@nestjs/common";
import { BaseController } from "src/commons/controller.common";
import { BaseService } from "src/commons/service.common";
import { MasterCountryEntity } from "./entities/master_country.entity";
import { MasterCountryService } from "./master_country.service";
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Master Country')
@Controller('master_country')
export class MasterCountryController extends BaseController<MasterCountryEntity>{
    constructor(private readonly countryService: MasterCountryService){
        super();
    }

    getService(): BaseService<MasterCountryEntity> {
        return this.countryService;
    }
    
}