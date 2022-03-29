import axios from 'axios';
import {
    SET_CURRENT_USER,
    ERRORS,
    GET_PRODUCTS,
    FAILURE_REGISTER,
    SUCCESSFULLY_REGISTER,
    AUTH_ERROR
} from '../actions/types';
import { setAuthToken } from '../utils/setAuthToken';
import { getServer } from '../utils';

export const setCurrentUser = user => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get(`${getServer}/api/auth`);
        dispatch({
            type: SET_CURRENT_USER,
            payload: user
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
            'Content-type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`${getServer}/api/users`, userData, config);
        dispatch({
            type: SUCCESSFULLY_REGISTER,
            payload: res.data
        })
    } catch (err) {
        const errors = err.response.data.error;
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