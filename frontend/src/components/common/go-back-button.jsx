import React from 'react'
import { Link } from 'react-router-dom'
import arrowLeftIcon from '../../assets/shared/icon-arrow-left.svg'

const GoBackButton = ({url="/"}) => {
  return (
    <Link to={url}>
      <button className="flex items-center gap-x-3.5">
        <img className='h-3' src={arrowLeftIcon} alt="back" />
        <span className='text-secondary-blue-dim font-bold text-[13px]'>Go Back</span>
      </button>
    </Link>
  )
}

export default GoBackButton