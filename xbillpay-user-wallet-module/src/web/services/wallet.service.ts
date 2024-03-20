import { BadRequestException, Injectable } from "@nestjs/common";
import { WalletRequestDto } from "../../domain/dto/request/wallet.creation";
import { WalletRepository } from "../../domain/repository/wallet.repository";
import { AddFundRequestDto } from "../../domain/dto/request/wallet.add-fund";
import { DeductDto } from "../../domain/dto/request/deduct.accountdto";

@Injectable()
export class WalletService {

  constructor(
   
    private readonly walletAccountRepository: WalletRepository,
  ) {}

  async createVirtualAccount(walletDto: WalletRequestDto,id:number) {
    
    return await this.walletAccountRepository.saveWallet(walletDto,id);
  }

  async fundVirtualAccount(walletDto: AddFundRequestDto) {
    const wallet =await  this.walletAccountRepository.findWalletByEmail(walletDto.email);
    if(wallet){
    
        wallet.amount+=walletDto.amount;
        
    return await this.walletAccountRepository.save(wallet);
    }else{
        throw new BadRequestException("Wallet Not found")
    }
  }

  async   deduct(deductDto: DeductDto) {
    const wallet =await  this.walletAccountRepository.findWalletByEmail(deductDto.email);
    if(wallet){
        wallet.amount-=deductDto.amount;
    return await this.walletAccountRepository.save(wallet);
    }else{
        throw new BadRequestException("Wallet Not found")
    }
}

  async checkVirtualAccount(walletId: number) {
    const wallet =await  this.walletAccountRepository.findWalletById(walletId);
    if(wallet){
        
    return{balance :  wallet.amount }
    }else{
        throw new BadRequestException("Wallet Not found")
    }
  }
}
