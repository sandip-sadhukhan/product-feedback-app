import React from 'react'
import GoBackButton from '../components/common/go-back-button'
import plusIcon from '../assets/shared/icon-plus.svg'
import Input from '../components/common/input'

const AddFeedbackPage = () => {
  return (
    <div className="flex flex-col gap-y-14 bg-lightest-blue p-6 min-h-screen">
      <GoBackButton url="/" />

      <div className="flex flex-col items-start gap-y-6 p-6 bg-white rounded-lg">
        <div className="flex items-center justify-center color-box p-3.5 rounded-full -mt-11">
          <img className='w-4 h-4' src={plusIcon} alt="Plus icon" />
        </div>
        <h3>Create New Feedback</h3>

        <div className="flex flex-col gap-y-4 w-full">
          <div className="flex flex-col gap-y-[3px]">
            <h4>Feedback Title</h4>
            <p className="text-secondary-blue-dim text-[13px]">
              Add a short, descriptive headline
            </p>
          </div>
          <Input />
        </div>
      </div>
    </div>
  )
}

export default AddFeedbackPage