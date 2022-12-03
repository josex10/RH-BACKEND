import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateMasterUserDto {
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
