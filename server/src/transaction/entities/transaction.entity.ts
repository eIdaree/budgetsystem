import { Category } from "src/category/entities/category.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Transaction {
    @PrimaryColumn({name:'transation_id'})
    id:number

    @Column()
    title:string
    
    @Column({nullable:true})
    type:string
    
    @ManyToOne(() => User , (user) => user.transactions)
    @JoinColumn({name: 'user_id'})
    author: User

    @ManyToOne(()=> Category, (category)=> category.transaction)
    @JoinColumn({name:'category_id'})
    category: Category

    @Column()
    sum:number 

    @Column()
    comment:string

    @CreateDateColumn()
    diteTime: Date

    @UpdateDateColumn()
    updateAt: Date
}
