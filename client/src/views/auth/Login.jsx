import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Input } from '../../components'

const Login = () => {
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        const name = e.target.name;
        switch (name) {
            case 'email': {
                setUser({ ...user, email: e.target.value });
                break;
            }
            case 'password': {
                setUser({ ...user, password: e.target.value });
                break;
            }
            default:
                return
        }
    }
    return (
        <div className='container'>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead">
                <i className="fas fa-user"></i>
                Sign into Your Account
            </p>
            <div className="form">
                <Input
                    name="email"
                    type="email"
                    placeholder="Enter Email"
                    value={user.email}
                    onChange={handleChange} />
            </div>
            <div className="form">
                <Input
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                    value={user.password}
                    onChange={handleChange} />
            </div>
            <button className="btn btn-primary">Sign In</button>
            <p className="my-1">Don't Have any account?<Link to={"/register"}>Sign Up</Link></p>
        </div>
    )
}

export default Login