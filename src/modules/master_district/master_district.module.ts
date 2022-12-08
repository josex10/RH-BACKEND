import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MasterdistrictEntity } from "./entities/master_district.entity";
import { MasterDistrictController } from "./master_district.controller";
import { MasterDistrictService } from "./master_district.service";

@Module({
    imports: [TypeOrmModule.forFeature([MasterdistrictEntity])],
    controllers: [MasterDistrictController],
    providers: [MasterDistrictService]
})
export class MasterDistrictModule {

}