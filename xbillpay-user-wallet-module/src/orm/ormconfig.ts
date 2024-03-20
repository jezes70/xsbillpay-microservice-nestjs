import { TypeOrmModule } from "@nestjs/typeorm";
import { WalletAccount } from "../domain/entities/user.wallet.account";

export const ormconfig:TypeOrmModule = {
    type:"mysql",
    host:"localhost",
    port:3306,
    username:"root",
    password:"",
    database:"wallet",
    entities: [WalletAccount],

    synchronize:true

}