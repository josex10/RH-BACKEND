import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MasterCountryEntity } from "./entities/master_country.entity";
import { MasterCountryController } from "./master_country.controller";
import { MasterCountryService } from "./master_country.service";

@Module({
    imports: [TypeOrmModule.forFeature([MasterCountryEntity])],
    controllers: [MasterCountryController],
    providers: [MasterCountryService]
})
export class MasterCountryModule {

}