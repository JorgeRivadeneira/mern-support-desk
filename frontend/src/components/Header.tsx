import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice.ts'
import React from "react"

function Header(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state: any) => state.auth);

    const onLogOut = () => {
        dispatch(logout() as any);
        dispatch(reset() as any);
        navigate('/');
    }

    return (
        <header className='header'>
            <div className="logo">
                <Link to='/'>Support Desk</Link>
            </div>
            <ul>
                {user ? (
                    <li>
                        <button className='btn' onClick={onLogOut}><FaSignOutAlt />LogOut</button>
                    </li>
                ) : (
                    <>
                        <li><Link to='/login'><FaSignInAlt />Login</Link></li>
                        <li><Link to='/register'><FaUser />Register</Link></li>
                    </>                 
                )}

            </ul>
        </header>
    )
}

export default Header