import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '../../components';
import { register } from '../../actions/authAction';
import { message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { ERRORS } from '../../actions/types';

const Register = (props) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [authError, authState] = useSelector((state) => {
        return [state.auth.errors, state.auth]
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // navigate('url') is used to navigate to that path
    useEffect(() => {
        authError.length > 0 &&
            authError.forEach((error) => {
                message.error(error.msg)
            })
    }, [authError])

    const handleChange = (e) => {
        const value = e.target.value;
        switch (e.target.name) {
            case 'name':
                setUser({ ...user, name: value });
                break;
            case 'email':
                setUser({ ...user, email: value });
                break;
            case 'password':
                setUser({ ...user, password: value });
                break;
            case 'confirmpassword':
                setUser({ ...user, confirmPassword: value });
                break;
            default:
                return
        }
    }

    const handleSubmit = () => {
        let role = location.search.split("?role=");
        role = role[role.length - 1];
        // console.log(role);
        const { name, email, password, confirmPassword } = user;
        const newUser = {
            name,
            email,
            password,
            role
        }
        if (password === confirmPassword) {
            dispatch(register(newUser));
            if (authState.isAuthenticated) {
                message.success(' Sucessfully register ');
                setTimeout(() => navigate('/'), 3000);
                dispatch({
                    type: ERRORS,
                    payload: []
                });
            }
        } else {
            message.error('password didnt match');
        }
    }

    return (
        <div className='container'>
            <h1 className="large text-primary">Register</h1>
            <p className="lead">
                <i className="fas fa-user"></i>
                Create Your Account
            </p>
            <div className="form">
                <Input
                    name="name"
                    type="text"
                    placeholder="Enter Name"
                    value={user.name}
                    onChange={handleChange} />
            </div>
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
            <div className="form">
                <Input
                    name="confirmpassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={user.confirmPassword}
                    onChange={handleChange} />
            </div>
            <button className="btn btn-primary" onClick={handleSubmit}>Register</button>
        </div>
    )
}

export default Register;    