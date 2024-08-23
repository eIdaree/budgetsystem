import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";
import { Category } from "src/category/entities/category.entity";
import { User } from "src/user/entities/user.entity";

export class CreateTransactionDto {
    @IsNotEmpty()
    title:string;

    @IsNotEmpty()
    @IsNumber()
    sum:number;

    @IsString()
    @MinLength(6)
    type: 'expense' | 'income';

    @IsNotEmpty()
    category: Category;
    @IsNotEmpty()
    author: User
    comment:string
}
