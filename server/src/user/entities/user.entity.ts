import { Category } from "src/category/entities/category.entity";
import { Transaction } from "src/transaction/entities/transaction.entity";
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column() 
    email:string;

    @Column() 
    password:string;

    @OneToMany(() => Category , (category) => category.user, {
        onDelete: 'CASCADE',
    })
    categories: Category[]

    @OneToMany(()=>Transaction,(transaction => transaction.author), {
        onDelete:'CASCADE'
    })
    transactions: Transaction[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updateAt: Date
}
