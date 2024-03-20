import {  IsNotEmpty } from "class-validator";

export class ResendOTPDto{

    @IsNotEmpty()
    email:string;
 
}