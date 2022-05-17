import { IsEmail, IsNotEmpty, IsNumber } from "class-validator"

export class AuthDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNumber()
    @IsNotEmpty()
    password: string;