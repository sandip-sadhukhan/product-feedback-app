import cn from 'classnames';
import Button from '../common/button';
import { useState } from 'react';

const Comment = (props) => {
  const [isCommentInputOpened, setIsCommentInputOpened] = useState(false);

  const {
    content,
    user: {
      image,
      name,
      username
    },
    replies=[],
    isReply=false
  } = props;

  const replyContent = (reply) => {
    return (
      <>
        <span className="mr-1 font-bold text-purple">
          @{reply.replyingTo}
        </span>

        {reply.content}
      </>
    )
  }

  return (
    <div className={cn("flex flex-col gap-y-4", {"py-6": !isReply})}>
      <div className="flex items-center justify-between">
        <div className="flex gap-x-4 md:items-start">
          <img className="rounded-full w-10" src={image} alt={name} />
          <div className="flex flex-col">
            <h6 className="font-bold text-[13px] text-secondary-blue">
              {name}
            </h6>
            <span className="text-secondary-blue-dim text-[13px]">
              @{username}
            </span>

            <p className={cn("hidden text-secondary-blue-dim text-[13px] leading-6 md:block", {"md:mt-4": !isReply, "md:mt-2.5": isReply})}>
              {content}
            </p>

            {
              isCommentInputOpened && (
              <div className="hidden items-start gap-x-2 md:flex mt-6">
                <textarea
                  className='flex-1 p-4 bg-lightest-blue rounded-lg h-20 text-[13px] text-secondary-blue'
                  placeholder='Type your comment here'
                ></textarea>
                <Button colorScheme="purple">Post Comment</Button>
              </div>
              )
            }
          </div>
          <button
            className="hidden text-dark-blue font-semibold text-[13px] md:block"
            onClick={() => setIsCommentInputOpened(true)}
            >
            Reply
          </button>
        </div>

        <button
          className="block text-dark-blue font-semibold text-[13px] md:hidden"
          onClick={() => setIsCommentInputOpened(true)}
          >
          Reply
        </button>
      </div>

      <p className="block text-secondary-blue-dim text-[13px] leading-6 md:hidden">
        {content}
      </p>

      {
        isCommentInputOpened && (
          <div className="flex items-start gap-x-2 md:hidden">
            <textarea
              className='flex-1 p-4 bg-lightest-blue rounded-lg h-20 text-[13px] text-secondary-blue'
              placeholder='Type your comment here'
            ></textarea>
            <Button colorScheme="purple">Post Comment</Button>
          </div>
        )
      }

      {
        replies.length > 0 && (
          <div className="flex gap-x-6 md:pl-5">
            <div
              className="w-px bg-secondary-blue-dim opacity-10 md:-mt-14"
            ></div>
            <div className="flex flex-col gap-y-3">
              {
                replies.map((reply, index) => (
                  <Comment
                    key={index}
                    content={replyContent(reply)}
                    user={reply.user}
                    isReply={true}
                  />
                ))
              }
            </div>
          </div>
        )
      }
    </div>
  );
};

export default Comment;
