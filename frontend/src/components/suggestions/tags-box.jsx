import React from 'react'
import Tag from './tag';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryFilter } from '../../redux/reducers/feedback-slice';

const TagsBox = () => {
  const {filters: {category}} = useSelector(state => state.feedback);
  const dispatch = useDispatch();

  const tags = [
    {label: "All", value: 'all'},
    {label: "UI", value: 'ui'},
    {label: "UX", value: 'ux'},
    {label: "Enhancement", value: 'enhancement'},
    {label: "Bug", value: 'bug'},
    {label: "Feature", value: 'feature'}
  ];

  const activeTag = category;

  const onChange = function(tagValue) {
    dispatch(setCategoryFilter(tagValue));
  }

  return (
    <div className='bg-white p-6 rounded-lg flex-1 flex flex-wrap justify-start items-center gap-x-1.5 gap-y-3.5'>
      {
        tags.map((tag) => (
          <Tag
            key={tag.value}
            isActive={tag.value===activeTag}
            onClick={() => onChange(tag.value)}
          >
            {tag.label}
          </Tag>
        ))
      }
    </div>
  )
}

export default TagsBox