import { Controller, Get , Response} from "@nestjs/common";
import { MasterCountryService } from "./master_country.service";
import { Response as Res } from 'express';
import { HttpResponseCommon } from "src/commons/helpers/http_response.common";

@Controller('master_country')
export class MasterCountryController{
    constructor(private readonly masterCountryService: MasterCountryService){}

    @Get()
    async findAll(@Response() res: Res, ) {
    try {
        const groupOfMasterCountries =  await this.masterCountryService.fnFindAll();
        return HttpResponseCommon.response200(res, groupOfMasterCountries);
    } catch (error) {
        return HttpResponseCommon.response500(res, error);
    }
    }
    
}