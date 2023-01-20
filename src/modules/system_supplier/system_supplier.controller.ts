import { BadRequestException, Body, Controller, Get, HttpCode, HttpException, HttpStatus, InternalServerErrorException, Param, Post, UseGuards } from '@nestjs/common';
import { GetCurrentUserId } from 'src/commons/decorators';
import { GeneralIdParamsDto } from 'src/commons/dtos';
import { ESystemMsg } from 'src/commons/enums';
import { AtGuard } from 'src/commons/guards';
import { SystemSupplierCreateDto } from './dto';
import { SystemSupplierService } from './system_supplier.service';
import { SystemSupplierWithState, TSystemSupplier } from './types';

@Controller('system-supplier')
export class SystemSupplierController {

    constructor(private systemSupplierService: SystemSupplierService){}

    @Post('create')
    @UseGuards(AtGuard)
    @HttpCode(HttpStatus.CREATED)
    async createSystemSupplier(
        @GetCurrentUserId() userId: number,
        @Body() newSystemSupplier: SystemSupplierCreateDto ): Promise<TSystemSupplier> {
        try {
            const checkSuppier = 
                await this.systemSupplierService.fnFindOneSystemSupplierByNameAndSystemCompanyId(
                    newSystemSupplier.clm_name, 
                    newSystemSupplier.clm_id_system_company
                );
            if(checkSuppier) throw new BadRequestException(ESystemMsg.SUPPLIERDUPLICATENAME);
            newSystemSupplier = { ...newSystemSupplier, clm_id_system_created_by: userId };
            const savedUser = await  this.systemSupplierService.fnSaveNewSystemSupplier(newSystemSupplier);

            const testquery = await this.systemSupplierService.fnFindOneSystemSupplierByIdQueryBuilder(savedUser.clm_id);

            return this.systemSupplierService.fnFindOneSystemSupplierById(savedUser.clm_id);

        } catch (error) {
            if(error instanceof HttpException){
                throw error;
            }
            throw new InternalServerErrorException(ESystemMsg.SERVERERROR);
        }
    }

    @Get('find-by-id/:id')
    @UseGuards(AtGuard)
    @HttpCode(HttpStatus.OK)
    async findByidSystemSupplier(@Param() params: GeneralIdParamsDto ): Promise<SystemSupplierWithState> {
        try {

            const foundSystemsupplier = await this.systemSupplierService.fnFindOneSystemSupplierByIdQueryBuilder(params.id);
            if(!foundSystemsupplier) throw new BadRequestException(ESystemMsg.SUPPLIERDOESNEXIST);
            return foundSystemsupplier;

        } catch (error) {
            if(error instanceof HttpException){
                throw error;
            }
            throw new InternalServerErrorException(ESystemMsg.SERVERERROR);
        }
    }

    @Get('find-all/:id')
    @UseGuards(AtGuard)
    @HttpCode(HttpStatus.OK)
    async findAllSystemsupplier(@Param() params: GeneralIdParamsDto ): Promise<SystemSupplierWithState[]> {
        try {
            return this.systemSupplierService.fnFindAllSystemsupplierQueryBuilder(params.id);

        } catch (error) {
            if(error instanceof HttpException){
                throw error;
            }
            throw new InternalServerErrorException(ESystemMsg.SERVERERROR);
        }
    }

}
