import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemSupplierEntity } from './entities/system_supplier.entity';
import { SystemSupplierController } from './system_supplier.controller';
import { SystemSupplierService } from './system_supplier.service';

@Module({
  imports: [TypeOrmModule.forFeature([SystemSupplierEntity])],
  controllers: [SystemSupplierController],
  providers: [SystemSupplierService]
})
export class SystemSupplierModule {}
