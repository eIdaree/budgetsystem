import React, { FC } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Fa500Px, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from '../hooks/useAuth';
import { useAppDispatch } from '../store/hooks';
import { logout } from '../store/user/userSlice';
import { removeTokenFromLocalStorage } from '../helper/localstorage.helper';
import { toast } from 'react-toastify';

const Header: FC = () => {
    const isAuth = useAuth()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const logoutHandler = () => {
        dispatch(logout())
        removeTokenFromLocalStorage('token')
        toast.success('You logged out.')
        navigate('/')
    }

  return (
    <header className='flex items-center justify-between bg-slate-800 px-4 py-2 shadow-sm backdrop-blur-sm'>
        <Link to='/'>
            <Fa500Px/>
        </Link>
        {isAuth && (
            <nav className='flex ml-auto'>
                <ul className='flex mr-10  items-center gap-5'>
                    <li className='text-green'>
                        <NavLink to={'/'} className={({isActive})=> isActive ? 'text-white' : 'text-white/50'}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/transactions'} className={({isActive})=> isActive ? 'text-white' : 'text-white/50'}>Transactions</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/categories'} className={({isActive})=> isActive ? 'text-white' : 'text-white/50'}>Categories</NavLink>
                    </li>
                </ul>
            </nav>
        )}

        {/* Actions */}
        {
            isAuth ? (
                <button className='btn btn-red' onClick={logoutHandler}>
                    <span>Log out</span>
                    <FaSignOutAlt/>
                </button>
            ) : (
                <Link className='py-2 text-white/50 ml-auto hover:text-white' to={'auth'}>
                    LogIn / Sign Up
                </Link>
            )
        }
    </header>
  )
}

export default Header