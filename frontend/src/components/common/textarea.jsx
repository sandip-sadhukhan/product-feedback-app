import React from 'react'

const TextArea = ({...extraProps}) => {
  return (
     <textarea
      className='flex-1 p-4 bg-lightest-blue rounded-lg h-20 text-[13px] text-secondary-blue'
      {...extraProps}
    ></textarea>
  )
}

export default TextArea