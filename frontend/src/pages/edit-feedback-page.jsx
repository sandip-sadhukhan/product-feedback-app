import React, { useEffect, useState } from 'react'
import GoBackButton from '../components/common/go-back-button'
import editIcon from '../assets/shared/icon-edit-feedback.svg'
import Input from '../components/common/input'
import TextArea from '../components/common/textarea'
import Button from '../components/common/button'
import Dropdown from '../components/common/dropdown'
import { useNavigate, useParams } from 'react-router-dom'
import cn from 'classnames'
import { useSelector } from 'react-redux'
import axios from '../utils/axios-instance'

const EditFeedbackPage = () => {
  const {feedbackId} = useParams();

  const navigate = useNavigate();
  const [hasAccess, setHasAccess] = useState(null);
  const {user} = useSelector(state => state.auth);

  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});

  const categoryOptions = [
    {label: "Feature", value: 1},
    {label: "UI", value: 2},
    {label: "UX", value: 3},
    {label: "Enhancement", value: 4},
    {label: "Bug", value: 5},
  ]

  const updateStatusOptions = [
    {label: "Suggestion", value: 1},
    {label: "Planned", value: 2},
    {label: "In-Progress", value: 3},
    {label: "live", value: 4},
  ]

  const fetchFeedback = async () => {
    try {
      const data = (await axios.get(`/feedbacks/${feedbackId}/edit/`)).data;
      setFormData(data);
      setHasAccess(true);
    } catch(error) {
      setHasAccess(false);
    }
  }

  useEffect(() => {
    fetchFeedback();
  }, [])

  if (hasAccess === null) {
    return (<div>Loading...</div>)
  } else if (hasAccess === false) {
    return <h1>You don't have access to this page</h1>
  }

  const onChange = function(e) {
    const newFormData = {...formData};
    newFormData[e.target.name] = e.target.value;
    setFormData(newFormData);
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`/feedbacks/${feedbackId}/edit/`, formData);
      setErrors({});
      return navigate(`/feedback/${feedbackId}`)
    } catch (error) {
      if (error?.response?.data) {
        setErrors(error.response.data)
      } else {
        throw error;
      }
    }
  }

  return (
    <div className="bg-lightest-blue p-6 min-h-screen">
      <div className="flex flex-col gap-y-14 max-w-xl mx-auto">
        <GoBackButton />

        <form onSubmit={onSubmit}>
          <div className="flex flex-col items-start gap-y-6 p-6 bg-white rounded-lg">
            <img className='h-14 -mt-12' src={editIcon} alt="Edit icon" />

            <h3 className='md:mb-4'>Editing '{formData.title}'</h3>

            <div className="flex flex-col gap-y-4 w-full">
              <div className="flex flex-col gap-y-[3px]">
                <h4>Feedback Title</h4>
                <p className="text-secondary-blue-dim text-[13px]">
                  Add a short, descriptive headline
                </p>
              </div>

              <Input value={formData.title} name="title" onChange={onChange} />
              {errors.title?.length ? (<span className='text-[13px] text-red-500'>{errors.title.join(",")}</span>) : null}
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

            <div className={cn("flex flex-col gap-y-4 w-full", {"hidden": !user.is_admin})}>
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
              <TextArea
                rows={4}
                value={formData.description}
                name="description"
                onChange={onChange}
              />
              {errors.description?.length ? (<span className='text-[13px] text-red-500'>{errors.description.join(",")}</span>) : null}
            </div>

            <div className="flex flex-col gap-y-4 mt-4 w-full md:flex-row-reverse md:justify-between md:gap-x-4 md:mt-2">
              <div className="flex flex-col gap-y-4 md:flex-row-reverse md:gap-x-4">
                <Button type="submit">Save Changes</Button>
                <Button type="button" onClick={() => navigate(-1)} colorScheme="secondary-blue">Cancel</Button>
              </div>

              <Button type="button" colorScheme="red">Delete</Button>
            </div>

          </div>
        </form>
      </div>
    </div>
  )
}

export default EditFeedbackPage