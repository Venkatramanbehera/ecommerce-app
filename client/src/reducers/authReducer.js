import {
    SET_CURRENT_USER,
    ERRORS,
    SUCCESSFULLY_REGISTER,
    FAILURE_REGISTER,
    AUTH_ERROR
} from '../actions/types';

const intialState = {
    isAuthenticated: false,
    user: {},
    token: localStorage.getItem("token"),
    errors: []
};

const authReducer = (state = intialState, actions) => {
    const { payload } = actions;
    switch (actions.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: payload
            }
        case SUCCESSFULLY_REGISTER:
            localStorage.setItem("token", payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true
            }
        case FAILURE_REGISTER:
        case AUTH_ERROR:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuthenticated: false
            }
        case ERRORS:
            return {
                ...state,
                errors: payload
            }

        default:
            return state
    }
}

export default authReducer;