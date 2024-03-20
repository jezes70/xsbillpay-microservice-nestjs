import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { WalletService } from './wallet.api.service';
import { CreateBillDto } from '../../domain/dto/request/create-bill.dto';
import { BillRepository } from '../../domain/repository/bill.respository';
import { XBILLPaymentEnity } from '../../domain/entities/XBILL.payment.entity';
import { Request } from 'express';

import { BillType, commissionRates } from '../../enums/bill-types.enum';
@Injectable()
export class BillPaymentService {
  constructor(private readonly walletService: WalletService,private readonly billRepository: BillRepository) {}

  async payBill(billPaymentDto: CreateBillDto, agentId: number,req:Request): Promise<string> {
    const agentWalletBalance = await this.walletService.getWalletBalance(agentId,req);
    console.log("agentWalletBalance")
    console.log(agentWalletBalance)
    console.log("agentWalletBalance")
    if (agentWalletBalance < billPaymentDto.amount) {
      throw new BadGatewayException('Insufficient funds in agent\'s wallet');
    }
    console.log(billPaymentDto.type)

 
    const commissionRate = this.calculateCommissionRate(billPaymentDto.type);
    const commissionAmount = (commissionRate / 100) * billPaymentDto.amount;


    const totalPaymentAmount = billPaymentDto.amount + commissionAmount;
    await this.walletService.deductFromWallet(agentId, totalPaymentAmount,req);
    console.log(`Agent ${agentId} paid ${totalPaymentAmount} for ${billPaymentDto.type}`);
    const bill = new XBILLPaymentEnity();
    bill.amount=billPaymentDto.amount
    bill.type=billPaymentDto.type
    bill.agentId=agentId
    bill.agent_comision=commissionAmount
    await this.billRepository.createBill(bill);


    return 'Bill payment successful'+commissionRate;
  }

  private calculateCommissionRate(billType: BillType): number {
    const commissionRate = commissionRates[billType];
    if (!commissionRate) {
      throw new Error(`Commission rate not found for bill type: ${billType}`);
    }
    return commissionRate;

  }
}
