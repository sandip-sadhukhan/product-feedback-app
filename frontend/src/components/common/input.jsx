import React from 'react'

const Input = ({...props}) => {
  return (
    <input
      className='bg-lightest-blue text-secondary-blue px-6 py-[13px] text-sm rounded-md'
      type="text"
      {...props}
    />
  )
}

export default Input