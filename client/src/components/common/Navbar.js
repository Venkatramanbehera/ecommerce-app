import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className='main-navbar bg-dark'>
            {/* <h1>
                <Link href=''>
                    <i className='fas fa-store'></i> e-shop
                </Link>
            </h1>
            <ul>
                <li> <Link to=''>Merchants</Link> </li>
                <li> <Link to=''>Register</Link> </li>
                <li> <Link to=''>Login</Link> </li>
            </ul> */}
            <h1>
                <a href=''>
                    <i className='fas fa-store'></i> e-shop
                </a>
            </h1>
            <ul>
                <li> <a to=''>Merchants</a> </li>
                <li> <a to=''>Register</a> </li>
                <li> <a to=''>Login</a> </li>
            </ul>
        </nav>
    )
}

export default Navbar