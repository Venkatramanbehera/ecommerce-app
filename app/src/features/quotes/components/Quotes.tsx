import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../../hooks/storeHooks'
import { fetchQuotes } from '../service/quotesSlice'

const Quotes = () => {
  const { quotes } = useAppSelector((state) => {
    return state.quotes
  })
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchQuotes())
  }, [])
  console.log(quotes)
  return <div>Quotes</div>
}

export default Quotes
