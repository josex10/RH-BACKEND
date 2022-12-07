import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';

export class UpdateMasterUserDto {

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    clm_id: number;
    
    @IsNotEmpty()
    @ApiProperty()
    clm_name: string;

    @IsNotEmpty()
    @ApiProperty()
    clm_lastname_1: string;

    @IsNotEmpty()
    @ApiProperty()
    clm_lastname_2: string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    clm_email: string;
}
