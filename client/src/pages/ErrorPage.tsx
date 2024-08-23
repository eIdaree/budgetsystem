import React, { FC } from 'react'
import { Link } from 'react-router-dom'

type Props = {}

const ErrorPage:FC = (props: Props) => {
  return (
    <div className='min-h-screen bg-slate-900 flex flex-col items-center justify-center gap-10 text-white'>
      <h2>Error</h2>
      <p>You did something wrong</p>
      <Link to={'/'} className='bg-sky-500 rounded-md px-6 py-2 hover:bg-sky-600'>Back</Link>
    </div>
  )
}

export default ErrorPage