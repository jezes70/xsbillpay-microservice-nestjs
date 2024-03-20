import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { APPID } from "../enums/app.enums";
@Entity()
export class WalletAccount {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;
    @Column()
    currency: string;
    @Column()
    amount: number;

    @Column()
    debit_currency: string;
    @Column()


    @Column()
    billing_name: string;
    @Column()

    billing_address: string;
    @Column()

    billing_city: string;
    @Column()

    billing_state: string;
    @Column()

    billing_postal_code: string;
    @Column()

    billing_country: string;
    @Column()

    first_name: string;
    @Column()

    last_name: string;
    @Column()

    date_of_birth: string;
    @Column()

    email: string;
    @Column()

    phone: string;
    @Column()

    card_type: string;
    @Column()

    gender: string;

    @Column()

    cardpin: number;
    @Column()

    cc: number;
    @Column()

    expire: string;
    @Column()

    cardNo: number;

    @Column()

    cardUniqId: number;

    accountNumber:number;
    @Column()

    bank:string;
    @Column()

    bankCode:string;

    @Column({ type: 'enum', enum: APPID })  
    appId: APPID;
}


