import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import "reflect-metadata";
import { User } from "../user/user";

@Entity()

export class History {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'text' })
    question: string

    @Column({ type: 'text' })
    answer: string

    @ManyToOne(() => User, user => user.histories)
    @JoinColumn({ name: 'user_id' })
    user: User
}