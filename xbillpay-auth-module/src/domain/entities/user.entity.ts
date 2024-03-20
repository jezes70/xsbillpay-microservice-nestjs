import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserStatus } from "../enums/enum.userStatus";
import { XBILLUserOTP } from "./user.otp";
import { Gender } from "../enums/enum.gender";
import { APPID } from "../enums/enum.app";

@Entity({name:"users"})
export class XBILLUserAgent{
    @PrimaryGeneratedColumn({type:'bigint'})
    id:number;

    @Column({nullable:false})
    firstName:string;
    @Column({nullable:false})
    lastName:string;

    @Column({nullable:false})
    phone:string;

    @Column({unique:true})
    email:string;

    @Column({nullable:false})
    password:string;

    @Column({nullable:true})
    type:string;

    @Column({ type: 'enum', enum: UserStatus, default: UserStatus.INACTIVE })  
    status: UserStatus;
    @Column({ type: 'enum', enum: Gender })  
    gender: Gender;
    @Column({ type: 'enum', enum: APPID })  
    appId: APPID;

    @OneToOne(() => XBILLUserOTP, { eager: true, cascade: true })
    @JoinColumn()
    otp: XBILLUserOTP;

}