import { BadGatewayException, BadRequestException, Injectable } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import axios from "axios";
import { error } from "console";
@Injectable()
export class WalletService {
  async getWalletBalance(agentId: number,req:Request):Promise<number> {
    console.log(req.headers.authorization)
    let amount =0;
    try{

   const response = await axios.get(`http://localhost:3003/api/v3/check-balance/${agentId}`, {
        headers: {
            'Authorization ': `${req.headers.authorization} `, 
            'Content-Type': 'application/json'
        }
      });
      amount=response.data.balance;
      console.log(amount)
      return amount;

    }catch(error){
        console.log("error")
        return 0;
    }
 
   
  }

  async deductFromWallet(agentId: number, commissionAmount: number,req:Request) {
    let status =false;
    const deduct = await axios.get(`http://localhost:3003/api/v3/deduct-wallet/${agentId}`, {
        headers: {
            'Authorization': `${req.headers.authorization}`,
            'Content-Type': 'application/json'
        }
      });

      status=deduct.data.status;
      console.log(status)
      return status;
  }

 

}