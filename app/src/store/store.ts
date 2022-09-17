import { AnyAction, configureStore } from '@reduxjs/toolkit'
import counterSlice from '../features/counter/counterSlice';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import logger from 'redux-logger';
import  authSlice  from '../features/auth/service/authSlice';
import  quotesSlice from '../features/quotes/service/quotesSlice';

export const store = configureStore({
    reducer: {
        counter: counterSlice,
        auth: authSlice,
        quotes: quotesSlice
    },
    middleware: [thunk,logger]
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type TypedDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
export type TypedThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;