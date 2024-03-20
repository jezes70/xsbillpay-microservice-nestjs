import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"transfer"})
export class TransferEntity{
    @PrimaryGeneratedColumn({type:'bigint'})
    id:number;
    @Column()
    amount:number;

}