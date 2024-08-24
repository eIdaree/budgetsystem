import  { FC, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Form, useLoaderData} from 'react-router-dom'
import { IResponseTransactionLoader } from '../types/types'
import CategoryModal from './CategoryModule'

const TransactionForm: FC = () => {
    const {categories} = useLoaderData() as IResponseTransactionLoader
    const [visibleModal, setVisibleModal] = useState<boolean>(false)
  return (
    <div className='rounded-md bg-slate-800 p-4'>
        <Form className='grid gap-2' method='post' action='/transactions'>
            <label className ='grid' htmlFor="title">
                <span>Title</span>
                <input 
                    type="text"
                    className='input border-slate-700'
                    placeholder='Title...'
                    name='title'
                    required 
                />
            </label>
            <label className ='grid'htmlFor="Sum">
                <span>Sum</span>
                <input 
                    type="number"
                    className='input border-slate-700'
                    placeholder='Sum...'
                    name='sum'
                    required 
                />
            </label>
            {/* Select */}
            {categories.length ? <label htmlFor="category" className='grid'>
                <span>Category</span>
                <select name="category" className='input border-slate-700'required>
                    {categories.map((ctg, idx)=>(
                        <option key={idx} value={ctg.id} >{ctg.title} </option>
                    ))}
                </select>
            </label> : 
                <h1 className='text-red'>To continue create a category first</h1>

            }
            
            
            {/* Add category */}
            <button 
              onClick={()=> setVisibleModal(true)} 
              className='mt-5 flex max-w-fit items-center gap-2 text-white/50 hover:text-white'>
                    <FaPlus/>
                    <span>Manage categories</span>
            </button>

            {/* Radio buttons */}
            <div className="flex gap-4 items-center mt-4">
                <label  className='flex cursor-pointer items-center gap-2'>
                    <input 
                        type="radio" 
                        name='type' 
                        value={'income'} 
                        className='form-radio text-blue-600' 
                        required
                    />
                    <span>Income</span>
                </label>
                <label  className='flex cursor-pointer items-center gap-2'>
                    <input 
                        type="radio" 
                        name='type' 
                        value={'expense'} 
                        className='form-radio text-blue-600' 
                        required
                    />
                     <span>Expense</span>
                </label>
            </div>
            {/* Comment */}
                <label htmlFor="comment" className='grid gap-2 mt-4'>
                    <span>Comment</span>
                    <input 
                        type="text"
                        className='input border-slate-700'
                        placeholder='Comment...'
                        name='comment'
                        required  
                    />
                </label>
            {/* Submission */}
            <button className='btn btn-green mt-2 max-w-fit'>
                Submit
            </button>
        </Form>

        {/* Create Modal */}
        {visibleModal && <CategoryModal type='post' setVisibleModal={setVisibleModal}/>}
    </div>
  )
}

export default TransactionForm