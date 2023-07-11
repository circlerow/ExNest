import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class OrderDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    userID: number;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}