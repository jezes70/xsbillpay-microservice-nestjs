import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { XBILLUserOTP } from '../entities/user.otp';
import { XBILLUserAgent } from '../entities/user.entity';

@Injectable()
export class OTPRepository {
  constructor(
    @InjectRepository(XBILLUserOTP)
    private OTPRepository: Repository<XBILLUserOTP>,
  ) {}

  async createOTP(newOTP: XBILLUserOTP): Promise<XBILLUserOTP> {
    return this.OTPRepository.save(newOTP);
  }

  async findOneByOTP(otp: string): Promise<XBILLUserOTP | undefined> {
    return this.OTPRepository.findOne({ where: { otp: otp } });
  }
  async findOneByOTPUser(user: XBILLUserAgent): Promise<XBILLUserOTP | undefined> {
    return this.OTPRepository.findOne({ where: { user: user } });
  }
  async deleteOTP(id:number){
    await this.OTPRepository.delete({ id: id });

  } 



}
