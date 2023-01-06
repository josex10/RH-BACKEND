import { Controller, Get , Param, Response} from "@nestjs/common";
import { Response as Res } from 'express';
import { HttpResponseCommon } from "src/commons/helpers/http_response.common";
import { MasterDistrictIdCantonDto } from "./dto/master_district_id_canton.dto";
import { MasterDistrictService } from "./master_district.service";

@Controller('master_district')
export class MasterDistrictController{
    constructor(private readonly masterDistrictService: MasterDistrictService){}

    @Get('getByCantonId/:clm_id_master_canton')
    async findAllByStateId(@Response() res: Res, @Param() params: MasterDistrictIdCantonDto) {
        try {
            const groupOfMasterDistrict =  await this.masterDistrictService.fnFindByCantonId(params.clm_id_master_canton);
            if(!groupOfMasterDistrict.length){
                return HttpResponseCommon.response404(res, null, 'Master District Not Found.');      
            }
            return HttpResponseCommon.response200(res, groupOfMasterDistrict);
        } catch (error) {
            return HttpResponseCommon.response500(res, error);
        }
    }
    
}