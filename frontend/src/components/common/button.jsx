import React from 'react'

const Button = (props) => {

  const {children} = props;

  return (
    <button className='flex gap-x-1 items-center justify-center bg-purple text-white font-bold text-sm py-3 px-6 rounded-lg cursor-pointer hover:bg-[#C75AF6]'>
      {children}
    </button>
  )
}

export default Button