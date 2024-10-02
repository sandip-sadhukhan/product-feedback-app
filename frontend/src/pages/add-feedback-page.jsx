import React, { useState } from 'react'
import GoBackButton from '../components/common/go-back-button'
import plusIcon from '../assets/shared/icon-plus.svg'
import Input from '../components/common/input'
import TextArea from '../components/common/textarea'
import Button from '../components/common/button'
import Dropdown from '../components/common/dropdown'

const AddFeedbackPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "feature",
    description: ""
  });

  const categoryOptions = [
    {label: "Feature", value: "feature"},
    {label: "UI", value: "ui"},
    {label: "UX", value: "ux"},
    {label: "Enhancement", value: "enhancement"},
    {label: "Bug", value: "bug"},
  ]

  return (
    <div className="bg-lightest-blue p-6 min-h-screen">
      <div className="flex flex-col gap-y-14 max-w-xl mx-auto">
        <GoBackButton url="/" />

        <div className="flex flex-col items-start gap-y-6 p-6 bg-white rounded-lg">
          <div className="color-box p-3.5 rounded-full -mt-11">
            <img className='h-4 translate-x-px translate-y-px' src={plusIcon} alt="Plus icon" />
          </div>

          <h3 className='md:mb-4'>Create New Feedback</h3>

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
            <Dropdown
              value={formData.category}
              options={categoryOptions}
              onOptionClick={(value) => setFormData({...formData, category: value})}
            />
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

          <div className="flex flex-col gap-y-4 mt-4 w-full md:flex-row-reverse md:justify-start md:gap-x-4 md:mt-2">
            <Button>Add Feedback</Button>
            <Button colorScheme="secondary-blue">Cancel</Button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AddFeedbackPage