import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class WalletRequestDto {
  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  debit_currency: string;

  @IsString()
  @IsNotEmpty()
  billing_name: string;

  @IsString()
  @IsNotEmpty()
  billing_address: string;

  @IsString()
  @IsNotEmpty()
  billing_city: string;

  @IsString()
  @IsNotEmpty()
  billing_state: string;

  @IsString()
  @IsNotEmpty()
  billing_postal_code: string;

  @IsString()
  @IsNotEmpty()
  billing_country: string;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsDateString()
  @IsNotEmpty()
  date_of_birth: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  gender: string;

  @IsOptional()
  @IsString()
  callback_url: string;
}
