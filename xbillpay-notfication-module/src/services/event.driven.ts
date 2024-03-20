import { Injectable } from "@nestjs/common";
import { ConsumeMessage } from "amqplib";

@Injectable()
export class EventDrivenService{
    constructor(){}

    async recievedOTP(message:ConsumeMessage){
        console.log(message)

    }
}