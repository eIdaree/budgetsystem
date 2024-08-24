import React, { FC, useState } from 'react'
import { AiFillCloseCircle, AiFillEdit } from 'react-icons/ai'
import { FaPlus } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import CategoryModal from '../components/CategoryModule'
import { instance } from '../api/axios.api'
import { ICategory } from '../types/types'

type Props = {}

export const categoriesAction = async ({request}:any) => {
  switch (request.method){
    case "POST":{
      const formData = await request.formData()
      const category = {
        title: formData.get('title')
      }
      await instance.post('/categories',category)
      return null
    }
    case "PATCH":{
      const formData = await request.formData()
      const category = {
        id:formData.get('id'),
        title:formData.get('title')
      }
      await instance.patch(`/categories/category/${category.id}`, category)
      return null
    }
    case "DELETE":{
      const formData = await request.formData()
      const categoryId = formData.get('id')
      await instance.delete(`/categories/category/${categoryId}`)
      return null
    }
  }
}
export const categoryLoader = async() => {
  const {data} = await instance.get<ICategory>('/categories')
  return data
}

const Categories: FC = (props: Props) => {
  const categories = useLoaderData() as ICategory
  const [categoryId, setCategoryId] = useState<number>(0)
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const [visibleModal, setVisibleModal] = useState<boolean>(false)
  return (
    <>
      <div className='mt-10 rounded-md bg-slate-800 p-4'>
        <h1>Your category list</h1>
        {/* Category List */}
          
      <div className='mt-2 flex flex-wrap items-center gap-2'>
        {categories.map((category,idx)=>(
        <div key={idx} className=" group relative flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-4">
          {category.title}
          <div className="absolute hidden bottom-0 left-0 right-0 top-0 items-center justify-between rounded-lg bg-black/70 px-3 group-hover:flex">
            <button onClick={() =>{
                setCategoryId(category.id)
                setVisibleModal(true)
                setIsEdit(true)
              }}>
              <AiFillEdit />
            </button>

            <Form className='flex' method='delete' action='/categories'>
                  <input type="hidden" name='id' value={category.id}/>
                  <button type='submit'>
                      <AiFillCloseCircle/>
                  </button>
            </Form>

          </div>
          </div> 
          ))}
        </div>
        {/* Add Category */}
        <button onClick={()=> setVisibleModal(true)} className='mt-5 flex max-w-fit items-center gap-2 text-white/50 hover:text-white'>
          <FaPlus/>
          <span>Create a new category</span>
        </button>
      </div>

        {/* Create Modal */}
      {visibleModal && <CategoryModal type='post' setVisibleModal={setVisibleModal}/>}

          {/* Edit Modal */}
      {visibleModal && isEdit && <CategoryModal type='patch' id={categoryId} setVisibleModal={setVisibleModal}/>}

    </>
  )
}

export default Categories