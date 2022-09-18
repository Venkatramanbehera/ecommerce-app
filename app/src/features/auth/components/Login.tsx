import React from 'react'
import FormButton from '../../../components/FormButton/FormButton'
import FormTextInput from '../../../components/FormTextInput/FormTextInput'

const Login = () => {
  return (
    <div>
      <FormTextInput type='email' label='Email' placeholder='Enter Email Address' isError={true} />
      <FormTextInput type='password' label='Password' placeholder='Enter Password' />
      <FormButton
        name='Create an account'
        onClick={() => {
          console.log('Press')
        }}
        buttonStatus='Danger'
      />
    </div>
  )
}

export default Login
