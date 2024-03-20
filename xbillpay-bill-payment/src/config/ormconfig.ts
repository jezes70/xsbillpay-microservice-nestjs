import { TypeOrmModule } from "@nestjs/typeorm";
import { XBILLPaymentEnity } from "../domain/entities/XBILL.payment.entity";


export const ormconfig:TypeOrmModule = {
    type:"mysql",
    host:"localhost",
    port:3306,
    username:"root",
    password:"",
    database:"bill_payment",
    entities: [XBILLPaymentEnity],

    synchronize:true

}