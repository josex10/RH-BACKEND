import { Controller, Get , Param, Response} from "@nestjs/common";
import { MasterStateService } from "./master_state.service";
import { Response as Res } from 'express';
import { HttpResponseCommon } from "src/commons/helpers/http_response.common";
import { MasterStateIdCountryDto } from "./dto/master_state_id_country.dto";

@Controller('master_state')
export class MasterStateController{
    constructor(private readonly masterStateService: MasterStateService){}

    @Get('getByCountryId/:clm_id_master_country')
    async findAllByCountryId(@Response() res: Res, @Param() params: MasterStateIdCountryDto) {
        try {
            const groupOfMasterStates =  await this.masterStateService.fnFindByCountryId(params.clm_id_master_country);
            if(!groupOfMasterStates.length){
                return HttpResponseCommon.response404(res, null, 'Master State Not Found.');      
            }
            HttpResponseCommon.response200(res, groupOfMasterStates);
        } catch (error) {
            HttpResponseCommon.response500(res, error);
        }
    }
    
}