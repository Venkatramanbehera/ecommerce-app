import React from 'react'

type IsButtonStatus = 'Primary' | 'Secondary' | 'Success' | 'Danger' | 'Warning'

type FormButtonProps = {
  name: string
  onClick: () => void
  buttonStatus: IsButtonStatus
}

const FormButton = (props: FormButtonProps) => {
  const { name, onClick, buttonStatus } = props
  return (
    <button
      onClick={onClick}
      className={`inline-block w-full px-6 py-2.5 bg-blue-600 ${
        buttonStatus === 'Secondary'
          ? 'bg-purple-600'
          : buttonStatus === 'Success'
          ? 'bg-green-600'
          : buttonStatus === 'Danger'
          ? 'bg-red-600'
          : buttonStatus === 'Warning'
          ? 'bg-yellow-500'
          : 'bg-blue-600'
      } text-white font-medium leading-tight uppercase rounded shadow-md ${
        buttonStatus === 'Secondary'
          ? 'hover:bg-purple-700'
          : buttonStatus === 'Success'
          ? 'hover:bg-green-700'
          : buttonStatus === 'Danger'
          ? 'hover:bg-red-700'
          : buttonStatus === 'Warning'
          ? 'hover:bg-yellow-700'
          : 'hover:bg-blue-700'
      } hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 transition duration-150 ease-in-out${
        buttonStatus === 'Secondary'
          ? 'active:bg-purple-900'
          : buttonStatus === 'Success'
          ? 'active:bg-green-900'
          : buttonStatus === 'Danger'
          ? 'active:bg-red-900'
          : buttonStatus === 'Warning'
          ? 'active:bg-yellow-900'
          : 'active:bg-blue-900'
      }`}
    >
      {name}
    </button>
  )
}

export default FormButton
