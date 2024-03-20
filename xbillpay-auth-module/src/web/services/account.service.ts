import { Injectable, ConflictException, NotFoundException, UnauthorizedException, BadRequestException } from "@nestjs/common";


import { UserRepository } from "../../domain/repositories/enity.repository";
import { RabbitMQService } from "../messanging/rabbitmq.message";
import { XBILLUserAgent } from "../../domain/entities/user.entity";
import axios from "axios";
import { WalletRequestDto } from "../../domain/dto/customer.virtual.dto";
import * as dotenv from 'dotenv';
import { FLUTTER_KEY } from "../../utils/app.utils";
import { Gender } from "../../domain/enums/enum.gender";
dotenv.config();



@Injectable()
export class PaystackService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly rabbitMQService: RabbitMQService
    ) {}
 
    async createVirtualcustomer(user:XBILLUserAgent){
        console.log(FLUTTER_KEY)
        const customer = new WalletRequestDto();

        customer.first_name=user.firstName
        customer.last_name=user.lastName
        customer.phone=user.phone
        customer.email=user.email
        customer.billing_country="Nigeria"
        customer.gender=user.gender
        customer.title= user.gender ==Gender.FEMAIL ? "Mrs" : "Mr"
        customer.date_of_birth="2000-05-21"
        customer.currency="NGN"
        customer.amount=10
        customer.billing_address="No 2 sangotdo eti osa"
        customer.billing_city="Lagos"
        customer.billing_name=user.firstName
        customer.billing_postal_code="100001"
        customer.billing_state="Lagos"
        customer.callback_url=`https://localhost:3000/callback-url/${user.id}`
        customer.debit_currency="NGN"
     

        const paysatckBaseUrl="http://localhost:3003/api/v3";
        axios.post(`${paysatckBaseUrl}/virtual-cards/${user.id}`, customer, {
            headers: {

              'Content-Type': 'application/json'
            }
          })
          .then(response => {
           
            console.log(response.data);
            return response.data.data;
            // axios.post(`${paysatckBaseUrl}/dedicated_account`, JSON.stringify({customer:id,preferred_bank:"wema-bank"}), {
            //     headers: {
            //       Authorization: `Bearer ${PAYSTACK_KEY}`,
            //       'Content-Type': 'application/json'
            //     }
            //   })   .then(response => {
            //     console.log(response.data)
            //     return response;
            //   })
            //   .catch(error => {
            //     console.error(error);
            //     return error
            //   });



            // return response.data.message
          })
          .catch(error => {
            console.error(error);
            return error
          });
          

    }


}