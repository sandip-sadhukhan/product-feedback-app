import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeSignInModal } from '../../redux/reducers/modal-slice';
import SignInModal from './signin-modal';

const Modals = () => {
  const {isSignInModalOpened} = useSelector(state => state.modal)
  const dispatch = useDispatch();

  return (
    <>
      {/* SignIn/SignUp Modal */}
      <SignInModal isOpen={isSignInModalOpened} onClose={() => dispatch(closeSignInModal())} />
    </>
  )
}

export default Modals