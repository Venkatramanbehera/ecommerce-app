import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LOGOUT } from '../../actions/types';
// import { logout } from '../../actions/authAction';

const Navbar = () => {
    const dispatch = useDispatch();
    const authState = useSelector((state) => {
        return state.auth
    })
    const { isAuthenticated } = authState;
    const logout = () => {
        dispatch({ type: LOGOUT })
    }
    const guest = (
        <ul>
            <li> <Link to='/register?role=merchant'>Merchants</Link> </li>
            <li> <Link to='/register?role=customer'>Register</Link> </li>
            <li> <Link to='/login'>Login</Link> </li>
        </ul>
    );
    const user = (
        <ul>
            <li> <Link to='/register?role=merchant'>Merchants</Link> </li>
            <li>
                <Link onClick={logout} to='#'>
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    <span className='hide-on-mobile'>
                        Logout
                    </span>
                </Link>
            </li>
        </ul>
    )
    return (
        <nav className='main-navbar bg-dark'>
            <h1>
                <Link to=''>
                    <i className='fas fa-store'></i> e-shop
                </Link>
            </h1>
            {
                isAuthenticated ? user : guest
            }
        </nav>
    )
}

export default Navbar