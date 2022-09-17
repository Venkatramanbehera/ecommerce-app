import React from 'react'
import { useAppSelector } from '../../../hooks/storeHooks'

const Login = () => {
  const authData = useAppSelector((state) => state.auth)
  console.log('auth', authData)
  return <div>Login</div>
}

export default Login
