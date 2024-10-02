import React from 'react'
import commentIcon from '../../assets/shared/icon-comments.svg'
import { Link } from 'react-router-dom'
import Tag from '../suggestions/tag'
import UpvoteBox from '../suggestions/upvote-box'

const RoadmapCard = (props) => {
  const {
    statusValue,
    statusLabel,
    title,
    description,
    upvoteCount,
    isUpvotedByCurrentUser,
    category,
    commentCount
  } = props;

  const statusBorderClassMap = {
    planned: 'border-t-light-orange',
    'in-progress': 'border-t-purple',
    live: 'border-t-sky-blue'
  };

  const statusDotClassMap = {
    planned: 'bg-light-orange',
    'in-progress': 'bg-purple',
    live: 'bg-sky-blue'
  };

  return (
    <div className={`flex flex-col gap-y-4 items-start p-6 bg-white rounded-lg border-t-[6px] ${statusBorderClassMap[statusValue]}`}>
      <div className="flex gap-x-2 items-center">
        <span className={`w-2 h-2 rounded-full ${statusDotClassMap[statusValue]}`}></span>
        <span className='text-[13px] text-secondary-blue-dim'>{statusLabel}</span>
      </div>

      <div className="flex flex-col items-start gap-x-[9px]">
        <Link to="/feedback/1">
          <h3 className="text-[13px] hover:text-dark-blue">{title}</h3>
        </Link>
        <p className="text-secondary-blue-dim text-[13px] mb-3 md:mb-4 md:mt-2">
          {description}
        </p>
        <Tag noHover><span className="capitalize">{category}</span></Tag>
      </div>

      <div className="flex items-center justify-between w-full">
        <UpvoteBox showHorizontal count={upvoteCount} isActive={isUpvotedByCurrentUser} />

        <div className="flex gap-x-2 items-center">
          <img src={commentIcon} alt="Comment" />
          <h4 className="text-[16px]">{commentCount}</h4>
        </div>
      </div>
    </div>
  )
}

export default RoadmapCard