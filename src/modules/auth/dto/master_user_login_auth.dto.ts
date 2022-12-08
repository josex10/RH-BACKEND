import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class MasterUserLoginAuthDto {
    @IsNotEmpty()
    @ApiProperty()
    @IsEmail()
    clm_username: string;
    
    @ApiProperty()
    @IsNotEmpty()
    clm_password: string;
}
