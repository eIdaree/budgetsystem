import { FC } from 'react'
import TransactionForm from '../components/TransactionForm'
import { ICategory, IResponseTransactionLoader } from '../types/types'
import { instance } from '../api/axios.api'
import { useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'
import TransactionTable from '../components/TransactionTable'

export const transactionLoader = async() => {
  const categories = await instance.get<ICategory[]>('/categories')
  const transactions = await instance.get('/transactions')
  const data = {
      categories:categories.data,
      transactions: transactions.data
  }
  return data
}
export const transactionAction = async({request}:any) => {
  switch (request.method){
    case 'POST':{
      const formData= await request.formData()
      const newTransaction = {
        title: formData.get('title'),
        sum: +formData.get('sum'),
        category: formData.get('category'),
        type: formData.get('type'),
        comment: formData.get('comment')
      }
      await instance.post('/transactions', newTransaction)
      toast.success('Transaction added')
      return null
    }
    case 'DELETE':{}
  }
  return null
}

const Transactions: FC = () => {

  return (
    <>
      <div className="mt-4 grid grid-cols-3 items-start gap-4">
        {/* Add transaction form */}
        <div className="col-span-2 grid"><TransactionForm/></div>

        {/* Statistic blocks */}
        <div className="rounded-md bg-slate-800 p-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-md text-center font-bold uppercase">
                Total income:
              </p>
              <p className='mt-2 rounded-sm bg-green-600 p-1 text-center'>
                1000$
              </p>
            </div>
            <div>
            <p className="text-md text-center font-bold uppercase">
                Total Expense:
              </p>
              <p className='mt-2 rounded-sm bg-red-500 p-1 text-center'>
                800$
              </p>
            </div>
            <p>Chart</p>
          </div>
        </div>
      </div>  
      {/* Transaction table */}
      <h1 className='my-5'><TransactionTable/></h1>
    </>
  )
}

export default Transactions