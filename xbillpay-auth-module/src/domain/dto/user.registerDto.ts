import { IsEmail, IsNotEmpty } from "class-validator";

export class RegisterDto{
    @IsNotEmpty()
    firstName:string;
    @IsNotEmpty()
    lastName:string;
    @IsNotEmpty()
    phone:string;
    @IsEmail()
    email:string;
    @IsNotEmpty()
    type:string;
    @IsNotEmpty() 
    password:string;
}