import React from "react";
import Tag from "./tag";
import UpvoteBox from "./upvote-box";

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
    <div className="flex items-center justify-between py-7 px-8 bg-white rounded-lg cursor-pointer">
      <div className="flex items-start gap-x-10">
        <UpvoteBox count={upvotesCount} isActive={isUpvotedByCurrentUser} />

        {/* Content */}
        <div className="flex flex-col gap-y-1 items-start">
          <h3>{title}</h3>
          <p className="text-secondary-blue-dim text-[16px] mb-2">{description}</p>
          <Tag><span className="capitalize">{category}</span></Tag>
        </div>
      </div>

      {/* Comment count */}
      <div className="flex gap-x-2 items-center">
        <img src="/public/assets/shared/icon-comments.svg" alt="Comment" />
        <h4 className="text-[16px]">{commentsCount}</h4>
      </div>
    </div>
  );
};

export default SuggestionCard;
