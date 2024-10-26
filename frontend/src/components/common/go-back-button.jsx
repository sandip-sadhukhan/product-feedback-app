import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import arrowLeftIcon from '../../assets/shared/icon-arrow-left.svg'
import { twMerge } from 'tailwind-merge'

const GoBackButton = ({className="", url=null}) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    if (url) {
      return navigate(url);
    } else {
      return navigate(-1);
    }
  };

  return (
    <button onClick={handleOnClick} className="flex items-center gap-x-3.5">
      <img className='h-3' src={arrowLeftIcon} alt="back" />
      <span className={twMerge('text-secondary-blue-dim font-bold text-[13px]', className)}>Go Back</span>
    </button>
  )
}

export default GoBackButton