import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class OrderDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    userID: number;
}