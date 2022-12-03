import { Body, Get, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { BaseService } from "./service.common";

export abstract class BaseController<T> {
    abstract getService(): BaseService<T>;

    @Get('all') 
    async findAll(): Promise<T[]>{
        return await this.getService().findAll();
    }

    @Get('find/:id')
    async findOne(@Param('id') id): Promise<T>{
        return await this.getService().findOne(id)
    }

    @Post('save')
    @HttpCode(HttpStatus.CREATED)
    async save(@Body() entity: T): Promise<T>{
        return await this.getService().save(entity);
    }

    @Post('save/many')
    @HttpCode(HttpStatus.CREATED)
    async saveMany(@Body() entities: T[]): Promise<T[]>{
        return await this.getService().saveMany(entities);
    }

    @Patch('delete/:id')
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id') id){
        return await this.getService().delete(id);
    }

    @Get('count')
    @HttpCode(HttpStatus.OK)
    async count(): Promise<number>{
        return await this.getService().count();
    }




}