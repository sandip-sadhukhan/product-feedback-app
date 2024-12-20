import React from 'react'
import cn from 'classnames';
import { twMerge } from 'tailwind-merge';

const Button = React.forwardRef((props, ref) => {

  const {children, className="", colorScheme="purple", disabled=false, ...extraProps} = props;

  const bgColorClassMap = {
    purple: "bg-purple",
    blue: "bg-dark-blue",
    'secondary-blue': "bg-secondary-blue",
    red: "bg-[#D73737]"
  }

  const bgHoverClassMap = {
    purple: "hover:bg-[#C75AF6]",
    blue: "hover:bg-[#7C91F9]",
    'secondary-blue': "hover:bg-[#656EA3]",
    red: "hover:bg-[#E98888]"
  }

  return (
    <button
      ref={ref}
      className={twMerge(cn(`flex gap-x-1 items-center justify-center text-white font-bold text-[13px] rounded-lg cursor-pointer px-4 py-[10.5px] ${bgColorClassMap[colorScheme]} ${bgHoverClassMap[colorScheme]} md:text-sm md:py-3 md:px-6`, {'opacity-20': disabled}), className)}
      {...extraProps}
    >
      {children}
    </button>
  )
});

export default Button