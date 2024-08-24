import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>
  ){}
  async create(createTransactionDto: CreateTransactionDto, id:number) {
   const newTransaction = {
      title: createTransactionDto.title,
      sum: createTransactionDto.sum,
      type: createTransactionDto.type,
      comment: createTransactionDto.comment,
      category: { id: +createTransactionDto.category},
      user: { id },

    }
    if(!newTransaction) throw new BadRequestException('Something went wrong')

    return await this.transactionRepository.save(newTransaction);
  }

  async findAll(id:number) {
    const transactions = await this.transactionRepository.find({
      where: {
        user: { id }
      },
      relations: {
        category: true
      },
      order:{
        dateTime: 'DESC'
      }
    })
    return transactions;
  }

  async findOne(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where:{
        id,
      },
      relations: {
        user: true,
        category: true
      },
    })
    if(!transaction) throw new NotFoundException('Transaction not found')
    return await transaction;
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.transactionRepository.findOne({
      where:{id}
    })
    if(!transaction) throw new NotFoundException('Transaction not found')
    return await this.transactionRepository.update(id,updateTransactionDto);
  }

  async remove(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where:{id}
    })
    if(!transaction) throw new NotFoundException('Transaction not found')
    return await this.transactionRepository.delete(id);
  }
  async findAllWithPagination(id:number, page:number,limit:number){
    const transactions = await this.transactionRepository.find({
      where: {
        user:{id}
      },
      relations:{
        category:true,
        user:{
          transactions:true
        },
      },
      order:{
        dateTime:"DESC"
      },
      take: limit,
      skip: (page - 1) * limit,
    })
    return transactions
  }
  async findAllByType(id:number,type:string){
    const transactions = await this.transactionRepository.find({
      where:{
        user:{id},
        type
      },
    })

    const total = transactions.reduce((acc,obj)=> acc + obj.sum,0);

    return total
  }
}
