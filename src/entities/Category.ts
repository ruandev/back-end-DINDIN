import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Transaction } from './Transaction'

@Entity('categories')
export class Category {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    description: string

    @OneToMany(() => Transaction, (transaction) => transaction.category)
    transactions: Transaction[]




}
