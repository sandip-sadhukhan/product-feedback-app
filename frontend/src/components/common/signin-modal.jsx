import React, { useState } from 'react'
import Button from './button'
import cn from 'classnames'
import iconClose from '../../assets/shared/mobile/icon-close.svg'
import Input from './input'
import axios from '../../utils/axios-instance'

const SignInModal = ({isOpen, onClose}) => {
  const [isLoginModal, setIsLoginModal] = useState(true);
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  })
  const [loginFormErrors, setLoginFormErrors] = useState({});

  const [signUpFormData, setSignUpFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: ""
  })

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

  const loginOnChange = (e) => {
    const newFormData = {...loginFormData};
    newFormData[e.target.name] = e.target.value;
    setLoginFormData(newFormData);
  }

  const signUpOnChange = (e) => {
    const newFormData = {...signUpFormData};
    newFormData[e.target.name] = e.target.value;
    setSignUpFormData(newFormData);
  }

  const loginFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/accounts/login/", loginFormData);
      setLoginFormErrors({});
      window.location.reload();
    } catch(error) {
      if (error?.response?.data) {
        setLoginFormErrors(error.response.data);
      } else {
        throw error;
      }
    }
  }

  return (
    <div
     onClick={handleOuterClick}
     className={cn("backdrop fixed flex items-center justify-center left-0 top-0 w-full h-full bg-black bg-opacity-60", {"hidden": !isOpen})}
     >
      <div className="relative flex flex-col items-center gap-y-8 bg-white text-black p-8 mx-3 rounded-lg max-w-[500px]">
        <button className="absolute -right-2 -top-2 p-2 bg-darkest-blue rounded-full" onClick={handleClose}>
          <img className='w-3' src={iconClose} alt="closeIcon" />
        </button>
        <h2 className='text-center'>You need to signin to perform this action</h2>

        {/* Signup */}
        <form className={cn("flex flex-col gap-y-3 w-full", {"hidden": isLoginModal})}>
          <Input placeholder="Name" />
          <div className="flex gap-x-2 items-center">
            <span className='text-[13px]'>Profile Picture: </span>
            <Input type="file" placeholder="Profile Picture" />
          </div>
          <Input placeholder="Username" />
          <Input placeholder="Email" />
          <Input placeholder="Password" />
          <Button className='w-full'>Signup</Button>
          <p className='text-[13px] text-center'>Already have an account? <span className='text-purple cursor-pointer' onClick={() => setIsLoginModal(true)}>Login here</span></p>
        </form>

        {/* Login */}
        <form onSubmit={loginFormSubmit} className={cn("flex flex-col gap-y-3 w-full", {"hidden": !isLoginModal})}>
          <div className="flex flex-col gap-y-1">
            <Input type="email" name="email" value={loginFormData.email} onChange={loginOnChange} placeholder="Email" />
            {loginFormErrors.email?.length ? (<span className='text-[13px] text-red-500'>{loginFormErrors.email.join(",")}</span>) : null}
          </div>

          <div className="flex flex-col gap-y-1">
            <Input type="password" name="password" value={loginFormData.password} onChange={loginOnChange} placeholder="Password" />
            {loginFormErrors.password?.length ? (<span className='text-[13px] text-red-500'>{loginFormErrors.password.join(",")}</span>) : null}
          </div>

          <Button type="submit" className='w-full'>Login</Button>

          <p className='text-[13px] text-center'>Don't have an account? <span className='text-purple cursor-pointer' onClick={() => setIsLoginModal(false)} >Signup here</span></p>
        </form>

        {/* <Button>Signin with Google</Button> */}
      </div>
    </div>
  )
}

export default SignInModal;