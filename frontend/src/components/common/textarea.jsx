import React from 'react'
import {twMerge} from 'tailwind-merge'

const TextArea = ({className="", rows=3, ...extraProps}) => {
  return (
     <textarea
      className={twMerge('flex-1 p-4 bg-lightest-blue rounded-lg text-sm text-secondary-blue', className)}
      rows={rows}
      {...extraProps}
    ></textarea>
  )
}

export default TextArea