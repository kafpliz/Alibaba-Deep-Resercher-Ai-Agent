import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import "reflect-metadata";
import { History } from "../history/history";

@Entity()

export class User {
    @PrimaryGeneratedColumn()
    id!: number
    
    @Column({type:'integer'})
    tg_id:number

    @Column({type:'boolean',default: null, nullable:true})
    sub:boolean

    @Column({type:'integer',default: null, nullable:true})
    subDate:boolean

    @OneToMany(()=>  History, history => history.user)
    histories: History[]
}