import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { SystemSupplierCreateDto, SystemSupplierEditDto } from './dto';
import { SystemSupplierEntity } from './entities/system_supplier.entity';
import { SystemSupplierWithState, TSystemSupplier } from './types'

@Injectable()
export class SystemSupplierService {


    constructor(@InjectRepository(SystemSupplierEntity) private systemSupplierRepository: Repository<SystemSupplierEntity>){}

    fnSaveNewSystemSupplier = async(systemSupplier: SystemSupplierCreateDto): Promise<TSystemSupplier> => {
        const newSystemSupplier = this.systemSupplierRepository.create(systemSupplier);
        return this.systemSupplierRepository.save(newSystemSupplier);
    }

    fnFindOneSystemSupplierByNameAndSystemCompanyId = async(systemSuplpierName: string, systemCompanyId: number): Promise<TSystemSupplier> => {
        return this.systemSupplierRepository.findOne({
            where: [{
                clm_id_system_company: systemCompanyId,
                clm_name: systemSuplpierName
            }]
        })
    }

    fnFindOneSystemSupplierById = async(systemSupplierId: number): Promise<TSystemSupplier> => {
        return this.systemSupplierRepository.findOne({
            where: [{
                clm_id: systemSupplierId
            }],
            relations: {
                state: true,
            },
        })
    }

    fnFindOneSystemSupplierByIdQueryBuilder = async(systemSupplierId: number): Promise<SystemSupplierWithState> => {
        return  await this.systemSupplierRepository.createQueryBuilder('supplier')
            .innerJoinAndSelect("supplier.state", "state")
            .select(['supplier', 'state.clm_id', 'state.clm_name'])
            .where('supplier.clm_id =:clm_id', {clm_id: systemSupplierId})
            .getOne();
    }

    fnFindAllSystemsupplierQueryBuilder = async(clm_id_system_company: number): Promise<SystemSupplierWithState[]> => {
        return  await this.systemSupplierRepository.createQueryBuilder('supplier')
            .innerJoinAndSelect("supplier.state", "state")
            .select(['supplier', 'state.clm_id', 'state.clm_name'])
            .where('supplier.clm_id_system_company =:clm_id_system_company', {clm_id_system_company: clm_id_system_company})
            .getMany();
    }

    fnUpdateSystemSupplier = async(systemSupplier: SystemSupplierEditDto): Promise<UpdateResult> => {
        return this.systemSupplierRepository.update({clm_id: systemSupplier.clm_id}, systemSupplier);
    }
}
