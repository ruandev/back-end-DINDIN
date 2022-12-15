import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import type { Category } from './Category'
import type { User } from './User'

@Entity('transactions')
export class Transaction {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "text" })
    description: string

    @Column({ type: "decimal" })
    value: number

    @Column({ type: "timestamp" })
    date: Date

    @Column()
    type: string

    @ManyToOne(() => User, (user) => user.transactions)
    @JoinColumn({ name: 'user_id' })
    user: User


    @ManyToOne(() => Category, (category) => category.transactions)
    @JoinColumn({ name: "category_id" })
    category: Category

}
