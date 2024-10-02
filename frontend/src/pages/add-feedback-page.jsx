import React from 'react'
import GoBackButton from '../components/common/go-back-button'
import plusIcon from '../assets/shared/icon-plus.svg'
import arrowDownIcon from '../assets/shared/icon-arrow-down.svg'
import Input from '../components/common/input'
import TextArea from '../components/common/textarea'
import Button from '../components/common/button'

const AddFeedbackPage = () => {
  return (
    <div className="flex flex-col gap-y-14 bg-lightest-blue p-6 min-h-screen">
      <GoBackButton url="/" />

      <div className="flex flex-col items-start gap-y-6 p-6 bg-white rounded-lg">
        <div className="color-box p-3.5 rounded-full -mt-11">
          <img className='h-4 translate-x-px translate-y-px' src={plusIcon} alt="Plus icon" />
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

        <div className="flex flex-col gap-y-4 w-full">
          <div className="flex flex-col gap-y-[3px]">
            <h4>Category</h4>
            <p className="text-secondary-blue-dim text-[13px]">
              Choose a category for your feedback
            </p>
          </div>
          <div className='flex items-center justify-between bg-lightest-blue text-secondary-blue px-6 py-[13px] text-[15px] rounded-md' type="text">
            <span>Feature</span>
            <img src={arrowDownIcon} alt="arrow" />
          </div>
        </div>

        <div className="flex flex-col gap-y-4 w-full">
          <div className="flex flex-col gap-y-[3px]">
            <h4>Feedback Detail</h4>
            <p className="text-secondary-blue-dim text-[13px]">
              Include any specific comments on what should be improved, added, etc.
            </p>
          </div>
          <TextArea rows={4} />
        </div>

        <div className="flex flex-col gap-y-4 mt-4 w-full">
          <Button>Add Feedback</Button>
          <Button colorScheme="secondary-blue">Cancel</Button>
        </div>

      </div>
    </div>
  )
}

export default AddFeedbackPage