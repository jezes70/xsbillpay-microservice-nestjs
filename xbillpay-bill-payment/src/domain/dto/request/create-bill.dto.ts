// create-bill.dto.ts

import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BillType } from '../../../enums/bill-types.enum';

export class CreateBillDto {
    @IsNotEmpty()
    @IsEnum(BillType)
    type: BillType;
  

  @IsNotEmpty()
  @IsNumber()
  amount: number;


}
