import { TypeOrmModule } from "@nestjs/typeorm";
import { XBILLUserAgent } from "../domain/entities/user.entity";
import { XBILLUserOTP } from "../domain/entities/user.otp";

export const ormconfig:TypeOrmModule = {
    type:"mysql",
    host:"localhost",
    port:3306,
    username:"root",
    password:"",
    database:"app",
    entities: [XBILLUserAgent,XBILLUserOTP],

    synchronize:true

}