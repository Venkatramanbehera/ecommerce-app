import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks'
import { decrement, increment } from './counterSlice'

const Counter = () => {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
  const handleChangeDecrement = () => {
    dispatch(decrement())
  }
  return (
    <div className='bg-red-100 flex text-center items-center justify-between border-1 border-red-700'>
      <button
        onClick={() => {
          dispatch(increment())
        }}
        className='bg-amber-400 px-4 py-2 ml-3 rounded-lg hover:bg-amber-500 active:bg-amber-200'
      >
        Increment
      </button>
      <h3 className='text-200'>counter Value - {count}</h3>
      <button
        onClick={handleChangeDecrement}
        className='bg-amber-400 px-4 py-2 mr-3 rounded-lg hover:bg-amber-500 active:bg-amber-200'
      >
        Decrement
      </button>
    </div>
  )
}

export default Counter
