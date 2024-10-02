import React, { useState } from 'react'
import GoBackButton from '../components/common/go-back-button'
import editIcon from '../assets/shared/icon-edit-feedback.svg'
import Input from '../components/common/input'
import TextArea from '../components/common/textarea'
import Button from '../components/common/button'
import Dropdown from '../components/common/dropdown'

const EditFeedbackPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "feature",
    updateStatus: "planned",
    description: ""
  });

  const categoryOptions = [
    {label: "Feature", value: "feature"},
    {label: "UI", value: "ui"},
    {label: "UX", value: "ux"},
    {label: "Enhancement", value: "enhancement"},
    {label: "Bug", value: "bug"},
  ]

  const updateStatusOptions = [
    {label: "Suggestion", value: "suggestion"},
    {label: "Planned", value: "planned"},
    {label: "In-Progress", value: "in-progress"},
    {label: "live", value: "live"},
  ]

  return (
    <div className="bg-lightest-blue p-6 min-h-screen">
      <div className="flex flex-col gap-y-14 max-w-xl mx-auto">
        <GoBackButton url="/" />

        <div className="flex flex-col items-start gap-y-6 p-6 bg-white rounded-lg">
          <img className='h-14 -mt-12' src={editIcon} alt="Edit icon" />

          <h3 className='md:mb-4'>Editing 'Add a dark theme option'</h3>

          <div className="flex flex-col gap-y-4 w-full">
            <div className="flex flex-col gap-y-[3px]">
              <h4>Feedback Title</h4>
              <p className="text-secondary-blue-dim text-[13px]">
                Add a short, descriptive headline
              </p>
            </div>
            <Input value="Add a dark theme option" />
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
              <h4>Update Status</h4>
              <p className="text-secondary-blue-dim text-[13px]">
                Change future state
              </p>
            </div>
            <Dropdown
              value={formData.updateStatus}
              options={updateStatusOptions}
              onOptionClick={(value) => setFormData({...formData, updateStatus: value})}
            />
          </div>

          <div className="flex flex-col gap-y-4 w-full">
            <div className="flex flex-col gap-y-[3px]">
              <h4>Feedback Detail</h4>
              <p className="text-secondary-blue-dim text-[13px]">
                Include any specific comments on what should be improved, added, etc.
              </p>
            </div>
            <TextArea rows={4} value="It would help people like me with light sensitivities." />
          </div>

          <div className="flex flex-col gap-y-4 mt-4 w-full md:flex-row-reverse md:justify-between md:gap-x-4 md:mt-2">
            <div className="flex flex-col gap-y-4 md:flex-row-reverse md:gap-x-4">
              <Button>Save Changes</Button>
              <Button colorScheme="secondary-blue">Cancel</Button>
            </div>

            <Button colorScheme="red">Delete</Button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default EditFeedbackPage