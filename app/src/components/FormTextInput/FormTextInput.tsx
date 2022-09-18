import React from 'react'

type TypeProps = 'email' | 'text' | 'password'

type FormTextInputProps = {
  type: TypeProps
  label: string
  placeholder: string
  isError?: boolean
}

const FormTextInput = (props: FormTextInputProps) => {
  const { type, label, placeholder, isError } = props
  return (
    <div className='m-3 xl:w-96'>
      <label
        htmlFor='exampleFormControlInput1'
        className='form-label inline-block mb-2 text-gray-700'
      >
        {label}
      </label>
      <div
        className={`input_container flex w-full px-3 py-1.5 bg-white bg-clip-padding border border-solid border-gray-700 ${
          isError && 'border-red-500'
        } rounded transition ease-in-out focus:bg-white  focus:border-blue-600 ${
          isError && 'focus:border-red-500'
        } focus:outline-none`}
      >
        <input
          type={type}
          placeholder={placeholder}
          className={
            'form-control block w-full text-base font-normal text-gray-700 bg-white  focus:text-gray-700 focus:bg-white focus:outline-none'
          }
        />
        {type === 'email' && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              d='M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25'
            />
          </svg>
        )}
        {type === 'password' && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z'
            />
          </svg>
        )}
      </div>
    </div>
  )
}

export default FormTextInput
