import { APPID } from "../../enums/app.enums";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity({name:"users"})
export class XBILLPaymentEnity{
    @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;
  @Column()
  amount: number;
  @Column()
  agentId: number;
  @Column({ type: 'enum', enum: APPID })  
  appId: APPID;

  @Column()
  paymentMethod: string; 
  createdAt: Date;
  updatedAt: Date;
  @Column()
  agent_comision: number;

}