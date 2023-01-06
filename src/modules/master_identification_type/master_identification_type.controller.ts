import { Controller, Get , Param, Response} from "@nestjs/common";
import { Response as Res } from 'express';
import { HttpResponseCommon } from "src/commons/helpers/http_response.common";
import { MasterIdentificationTypeIdDto } from "./dto/master_identification_type_id.dto";
import { MasterIdentificacionTypeService } from "./master_identification_type.service";

@Controller('master_identification_type')
export class MasterIdentificationTypeController{
    constructor(private readonly masterIdentificacionTypeService: MasterIdentificacionTypeService){}

    @Get(':clm_id')
    async findById(@Response() res: Res, @Param() params: MasterIdentificationTypeIdDto) {
        try {
            const groupOfMasterIdentificationTypes =  await this.masterIdentificacionTypeService.fnFindById(params.clm_id);
            if(!groupOfMasterIdentificationTypes.length){
                return HttpResponseCommon.response404(res, null, 'Master Indetification Type Not Found.');      
            }
            return HttpResponseCommon.response200(res, groupOfMasterIdentificationTypes);
        } catch (error) {
            return HttpResponseCommon.response500(res, error);
        }
    }

    @Get()
    async findAll(@Response() res: Res) {
        try {
            const groupOfMasterIdentificationTypes =  await this.masterIdentificacionTypeService.fnFindAll();
            return HttpResponseCommon.response200(res, groupOfMasterIdentificationTypes);
        } catch (error) {
            return HttpResponseCommon.response500(res, error);
        }
    }
    
}