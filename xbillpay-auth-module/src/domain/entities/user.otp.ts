import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { XBILLUserAgent } from "./user.entity";

@Entity({name:"otp_table"})
export class XBILLUserOTP{
    @PrimaryGeneratedColumn({type:'bigint'})
    id:number;

    @Column()
    otp:string;

    @Column()
    date:Date;


    @OneToOne(() => XBILLUserAgent, user => user.otp)
    @JoinColumn()
    user: XBILLUserAgent;

}