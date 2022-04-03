import axios from 'axios';
import {
    SET_CURRENT_USER,
    ERRORS,
    FAILURE_REGISTER,
    SUCCESSFULLY_REGISTER,
    AUTH_ERROR,
    SUCCESSFULLY_LOGIN,
    FAILURE_LOGIN,
} from '../actions/types';
import setAuthToken from '../utils/setAuthToken';
import { getServer } from '../utils';

export const setCurrentUser = user => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get(`${getServer()}/api/auth`);
        dispatch({
            type: SET_CURRENT_USER,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
}

export const register = (userData) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`${getServer()}/api/users`, userData, config);
        dispatch({
            type: SUCCESSFULLY_REGISTER,
            payload: res.data
        })
        dispatch(setCurrentUser());
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            dispatch({
                type: ERRORS,
                payload: errors
            });
        } else {
            dispatch({
                type: FAILURE_REGISTER
            });
        }
    }
}

// login user
export const login = (userData) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`${getServer()}/api/auth`, userData, config);
        dispatch({
            type: SUCCESSFULLY_LOGIN,
            payload: res.data
        })
        dispatch(setCurrentUser());
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            dispatch({
                type: ERRORS,
                payload: errors
            });
        } else {
            dispatch({
                type: FAILURE_LOGIN
            });
        }
    }
}