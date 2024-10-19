import React from 'react'
import {twMerge} from 'tailwind-merge'

const TextArea = React.forwardRef(({className="", rows=3, ...extraProps}, ref) => {
  return (
     <textarea
      className={twMerge('flex-1 p-4 bg-lightest-blue rounded-lg text-sm text-secondary-blue', className)}
      rows={rows}
      ref={ref}
      {...extraProps}
    ></textarea>
  )
});

export default TextArea