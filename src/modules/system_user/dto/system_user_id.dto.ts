import { IsNotEmpty, IsNumberString } from "class-validator";

export class SystemUserIdDto {
    @IsNumberString()
    @IsNotEmpty()
    id: number;
}