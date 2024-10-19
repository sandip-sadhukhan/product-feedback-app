import React from 'react'
import { twMerge } from 'tailwind-merge';

const Input = React.forwardRef((props, ref) => {
  const {className="", ...extraProps} = props;

  return (
    <input
      className={twMerge('bg-lightest-blue text-secondary-blue px-6 py-[13px] text-sm rounded-md', className)}
      type="text"
      {...extraProps}
      ref={ref}
    />
  )
});

export default Input