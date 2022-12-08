import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MasterIdentificationTypeEntity } from "./entities/master_identification_type.entity";
import { MasterIdentificationTypeController } from "./master_identification_type.controller";
import { MasterIdentificacionTypeService } from "./master_identification_type.service";

@Module({
    imports: [TypeOrmModule.forFeature([MasterIdentificationTypeEntity])],
    controllers: [MasterIdentificationTypeController],
    providers: [MasterIdentificacionTypeService]
})
export class MasterIdentificationTypeModule {

}