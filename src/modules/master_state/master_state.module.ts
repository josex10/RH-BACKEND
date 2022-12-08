import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MasterStateEntity } from "./entities/master_state.entity";
import { MasterStateController } from "./master_state.controller";
import { MasterStateService } from "./master_state.service";

@Module({
    imports: [TypeOrmModule.forFeature([MasterStateEntity])],
    controllers: [MasterStateController],
    providers: [MasterStateService]
})
export class MasterStateModule {

}