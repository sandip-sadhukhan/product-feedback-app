import React from 'react'
import Tag from './tag';

const TagsBox = () => {
  const tags = ["All", "UI", "UX", "Enhancement", "Bug", "Feature"];
  const activeTag = "All";

  return (
    <div className='bg-white p-6 rounded-lg flex flex-wrap justify-start items-center gap-x-1.5 gap-y-3.5'>
      {
        tags.map((tag) => (
          <Tag key={tag} name={tag} isActive={tag===activeTag} />
        ))
      }
    </div>
  )
}

export default TagsBox