import { Injectable } from "@nestjs/common";

@Injectable()
export class APIService{
    findAccount(agentId: number) {
        throw new Error("Method not implemented.");
    }
    async transfer(walletDto: any) {
        throw new Error("Method not implemented.");
    }

}