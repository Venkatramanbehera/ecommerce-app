import React from 'react'
import Login from './features/auth/components/Login'
import Counter from './features/counter/Counter'
import Quotes from './features/quotes/components/Quotes'
function App() {
  return (
    <>
      <div className='bg-green-300 border-green-600 border-b p-4 m-4 rounded-lg'>
        <Counter />
      </div>
      <Login />
      <Quotes />
    </>
  )
}

export default App
