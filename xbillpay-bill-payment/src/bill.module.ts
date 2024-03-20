import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { XBILLPaymentEnity } from './domain/entities/XBILL.payment.entity';
import { BillController } from './web/controllers/bill.pay.controller';
import { BillPaymentService } from './web/services/user.bill.service';
import { BillRepository } from './domain/repository/bill.respository';
import { ormconfig } from './config/ormconfig';
import { WalletService } from './web/services/wallet.api.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
   
    TypeOrmModule.forFeature([XBILLPaymentEnity])],
  controllers: [BillController],
  providers: [BillPaymentService,BillRepository,WalletService,JwtService],
})
export class BillModule {
  }
