import {  IsNotEmpty,IsEmail } from 'class-validator';

export class AddFundRequestDto {
    @IsNotEmpty()
    amount:number;
    @IsEmail()
    email:string;
    @IsNotEmpty()
    walletId:number;

}