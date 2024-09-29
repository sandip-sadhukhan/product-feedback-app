import React from "react";
import Tag from "./tag";
import UpvoteBox from "./upvote-box";
import commentIcon from '../../assets/shared/icon-comments.svg'

const SuggestionCard = (props) => {
  const {
    upvotesCount,
    isUpvotedByCurrentUser,
    title,
    description,
    category,
    commentsCount
  } = props;

  return (
    <div className="flex flex-col gap-y-4 items-start py-7 px-8 bg-white rounded-lg cursor-pointer md:flex-row md:items-center md:justify-between">
      <div className="flex items-start gap-x-10">
        <div className="hidden md:block">
          <UpvoteBox count={upvotesCount} isActive={isUpvotedByCurrentUser} />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-y-1 items-start">
          <h3 className="text-[13px] md:text-lg">{title}</h3>
          <p className="text-secondary-blue-dim mb-2 text-[13px] md:text-[16px]">{description}</p>
          <Tag><span className="capitalize">{category}</span></Tag>
        </div>
      </div>

      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="block md:hidden">
          <UpvoteBox count={upvotesCount} isActive={isUpvotedByCurrentUser} />
        </div>

        {/* Comment count */}
        <div className="flex gap-x-2 items-center">
          <img src={commentIcon} alt="Comment" />
          <h4 className="text-[16px]">{commentsCount}</h4>
        </div>
      </div>
    </div>
  );
};

export default SuggestionCard;
