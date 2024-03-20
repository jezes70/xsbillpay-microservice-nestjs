import {  IsNotEmpty } from "class-validator";

export class VerifyOTPDto{
    @IsNotEmpty()
    otp:string;
    @IsNotEmpty()
    email:string;
 
}