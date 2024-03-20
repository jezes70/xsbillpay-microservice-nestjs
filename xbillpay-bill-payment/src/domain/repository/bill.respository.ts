import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { XBILLPaymentEnity } from '../entities/XBILL.payment.entity';
import { APPID } from 'src/enums/app.enums';

@Injectable()
export class BillRepository {

  constructor(
    @InjectRepository(XBILLPaymentEnity)
    private billRepository: Repository<XBILLPaymentEnity>,
  ) {}

  async createBill(newBill: XBILLPaymentEnity): Promise<XBILLPaymentEnity> {
    return this.billRepository.save(newBill);
  }

  async checkApp(appId: APPID): Promise<XBILLPaymentEnity | undefined> {
    return this.billRepository.findOne({ where: { appId: appId } });
  }

 

}
