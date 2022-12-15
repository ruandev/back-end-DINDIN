import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Relation } from "typeorm"
import { Category } from './Category'
import { User } from './User'

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
    user: Relation<User>


    @ManyToOne(() => Category, (category) => category.transactions)
    @JoinColumn({ name: "category_id" })
    category: Relation<Category>

}
