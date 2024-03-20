import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { TransferService } from "../services/transaction.service";
import { TransferFundRequestDto } from "../../domain/model/request/transfer.dto";
import { AuthGuard } from "../../guard/auth.guards";


@Controller("api/v3/transfer")
export class TransferController{
    private transferService:TransferService;

    constructor(
        transferService:TransferService) {
            this.transferService=transferService; 
        }

        @Post("transfer-fund/:id")
        @UsePipes(new ValidationPipe())
        @UseGuards(AuthGuard)
        addFunds(@Body() transferDto: TransferFundRequestDto){
            return this.transferService.transfer(transferDto);
        }

     
    }