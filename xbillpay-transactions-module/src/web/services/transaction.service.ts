import { Injectable } from "@nestjs/common";
import { APIService } from "./api.call.service";
import { TransferFundRequestDto } from "../../domain/model/request/transfer.dto";

@Injectable()
export class TransferService{
    constructor(private  apiservice: APIService){}
    async transfer(walletDto: TransferFundRequestDto) {
        const findaccount = this.apiservice.findAccount(walletDto.agentId)
        throw new Error("Method not implemented.");
    }

}