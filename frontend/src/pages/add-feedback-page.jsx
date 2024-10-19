import React, { useState } from 'react'
import cn from 'classnames';
import GoBackButton from '../components/common/go-back-button'
import plusIcon from '../assets/shared/icon-plus.svg'
import Input from '../components/common/input'
import TextArea from '../components/common/textarea'
import Button from '../components/common/button'
import Dropdown from '../components/common/dropdown'
import { useNavigate } from 'react-router-dom'
import axios from '../utils/axios-instance';
import { useDispatch, useSelector } from 'react-redux'
import { openSignInModal } from '../redux/reducers/modal-slice'

const AddFeedbackPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: 1,
    description: ""
  });

  const [errors, setErrors] = useState({
    title: [],
    category: [],
    description: [],
  });

  const categoryOptions = [
    {label: "Feature", value: 1},
    {label: "UI", value: 2},
    {label: "UX", value: 3},
    {label: "Enhancement", value: 4},
    {label: "Bug", value: 5},
  ]

  const onChange = (e) => {
    let newFormData = {...formData};
    newFormData[e.target.name] = e.target.value;
    setFormData(newFormData);
  }

  const {isAuthenticated} = useSelector(state => state.auth)
  const dispatch = useDispatch();

  const isAuthCheck = (fn) => {
    return function(...args) {
      if (isAuthenticated) {
        fn(...args);
      } else {
        dispatch(openSignInModal())
      }
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();

    isAuthCheck(async function() {
      try {
        await axios.post("/feedbacks/add/", formData);
        navigate('/')
      } catch(error) {
        const newErrors = {
          title: [],
          category: [],
          description: []
        };
        Object.assign(newErrors, error.response.data);
        setErrors(newErrors);
      }
    })();
  }

  return (
    <div className="bg-lightest-blue p-6 min-h-screen">
      <div className="flex flex-col gap-y-14 max-w-xl mx-auto">
        <GoBackButton />

        <form onSubmit={onSubmit}>
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
              
              <div className="flex flex-col gap-y-2">
                <Input value={formData.title} name="title" onChange={onChange} className={cn({"border-red-500 border": errors.title.length})} />
                {errors.title.length ? (<span className='text-[13px] text-red-500'>{errors.title}</span>) : null}
              </div>
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
              <div className="flex flex-col gap-y-2">
                <TextArea rows={4} name="description" value={formData.description} onChange={onChange} className={cn({"border-red-500 border": errors.description.length})} />

                {errors.description.length ? (<span className='text-[13px] text-red-500'>{errors.description}</span>) : null}
              </div>
            </div>

            <div className="flex flex-col gap-y-4 mt-4 w-full md:flex-row-reverse md:justify-start md:gap-x-4 md:mt-2">
              <Button type="submit">Add Feedback</Button>
              <Button type="button" onClick={() => navigate(-1)} colorScheme="secondary-blue">Cancel</Button>
            </div>

          </div>

        </form>
      </div>
    </div>
  )
}

export default AddFeedbackPage