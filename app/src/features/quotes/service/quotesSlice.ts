import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../../../store/store'
import { QuotesIntial, Quote } from './quotes'

export const initialState: QuotesIntial = {
  quotes: [],
  error: '',
  loading: false
}

export const fetchQuotes = createAsyncThunk('user/fetchQuotes', () => {
  return axios
    .get('https://quote-garden.herokuapp.com/api/v3/quotes')
    .then((response) => {
      return response.data.data
    })
})

export const quotesSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchQuotes.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(fetchQuotes.fulfilled, (state, action: PayloadAction<Quote[]>) => {
      state.loading = false;
      state.quotes = action.payload
    })
    builder.addCase(fetchQuotes.rejected, (state, action: AnyAction) => {
      state.loading = false;
      state.quotes = [];
      state.error = action.error.message || 'Something went wrong';
    })
  },
})

export const quotesselector = (state: RootState) => state.quotes

export default quotesSlice.reducer
