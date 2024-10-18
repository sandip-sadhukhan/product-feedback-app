import React from 'react'
import Button from './button'
import cn from 'classnames'
import iconClose from '../../assets/shared/mobile/icon-close.svg'

const SignInModal = ({isOpen, onClose}) => {
  const handleClose = function(event) {
    event.stopPropagation();
    onClose(event);
  }

  const handleOuterClick = function(event) {
    event.stopPropagation()

    if (event.target.classList.contains("backdrop")) {
      onClose(event);
    }
  }

  return (
    <div
     onClick={handleOuterClick}
     className={cn("backdrop fixed flex items-center justify-center left-0 top-0 w-full h-full bg-black bg-opacity-60", {"hidden": !isOpen})}
     >
      <div className="relative flex flex-col items-center gap-y-8 bg-white text-black p-8 rounded-lg">
        <button className="absolute -right-2 -top-2 p-2 bg-darkest-blue rounded-full" onClick={handleClose}>
          <img className='w-3' src={iconClose} alt="closeIcon" />
        </button>
        <h2>You need to signin for this action</h2>

        <Button>Signin with Google</Button>
      </div>
    </div>
  )
}

export default SignInModal;