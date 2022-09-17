import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../../store/store';
import { AuthState, CurrentUser, AuthError } from './auth';

export const initialState: AuthState = {
    isAuth: false,
    isLoading: false,
    error: {message : 'An Error Occured'}
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.isLoading = payload;
        },
        setAuthSucess: (state, { payload }: PayloadAction<CurrentUser>) => {
            state.currentUser = payload;
            state.isAuth = true;
        },
        setLogout: (state) => {
            state.isAuth = false;
            state.currentUser = undefined;
        },
        setAuthFailed: (state, { payload }: PayloadAction<AuthError>) => {
            state.error = payload;
            state.isAuth = false;
        }
    }
})

export const { setAuthSucess, setLoading, setLogout, setAuthFailed } = authSlice.actions;
export const authSelector = (state: RootState) => state.auth

export default authSlice.reducer