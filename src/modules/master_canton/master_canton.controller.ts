import { Controller, Get , Param, Response} from "@nestjs/common";
import { Response as Res } from 'express';
import { HttpResponseCommon } from "src/commons/http_response.common";
import { MasterCantonIdStateDto } from "./dto/master_canton_id_state.dto";
import { MasterCantonService } from "./master_canton.service";

@Controller('master_canton')
export class MasterCantonController{
    constructor(private readonly masterCantonService: MasterCantonService){}

    @Get('getByStateId/:clm_id_master_state')
    async findAllByStateId(@Response() res: Res, @Param() params: MasterCantonIdStateDto) {
        try {
            const groupOfMasterCanton =  await this.masterCantonService.fnFindByStateId(params.clm_id_master_state);
            if(!groupOfMasterCanton.length){
                return HttpResponseCommon.response404(res, null, 'Master Canton Not Found.');      
            }
            return HttpResponseCommon.response200(res, groupOfMasterCanton);
        } catch (error) {
            return HttpResponseCommon.response500(res, error);
        }
    }
    
}