import { IsNotEmpty, IsNumberString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class IdParamMasterUserDto {
    @IsNumberString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'This is the ID of the master user',
        type: Number,
      })
    id: number;
}