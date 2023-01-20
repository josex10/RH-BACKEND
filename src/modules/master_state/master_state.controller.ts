import { BadRequestException, Controller, Get , HttpException, InternalServerErrorException, Param, Response} from "@nestjs/common";
import { MasterStateService } from "./master_state.service";
import { MasterStateIdCountryDto } from "./dto/master_state_id_country.dto";
import { ESystemMsg } from "src/commons/enums";
import { IMasterState } from "./interfaces/master_state.interface";

@Controller('master_state')
export class MasterStateController{
    constructor(private readonly masterStateService: MasterStateService){}

    @Get('getByCountryId/:clm_id_master_country')
    async findAllByCountryId(@Param() params: MasterStateIdCountryDto): Promise<IMasterState[]> {
        try {
            const groupOfMasterStates =  await this.masterStateService.fnFindByCountryId(params.clm_id_master_country);
            if(!groupOfMasterStates.length)throw new BadRequestException(ESystemMsg.MASTERSTATENOTFOUNDBYCOUNTRY);
            return groupOfMasterStates;
        } catch (error) {
            if(error instanceof HttpException){
                throw error;
              }
            throw new InternalServerErrorException(ESystemMsg.SERVERERROR)
        }
    }
    
}