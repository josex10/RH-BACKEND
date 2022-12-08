import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MasterCantonEntity } from "./entities/master_canton.entity";
import { MasterCantonController } from "./master_canton.controller";
import { MasterCantonService } from "./master_canton.service";

@Module({
    imports: [TypeOrmModule.forFeature([MasterCantonEntity])],
    controllers: [MasterCantonController],
    providers: [MasterCantonService]
})
export class MasterCantonModule {

}