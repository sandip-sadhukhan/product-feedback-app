import cn from 'classnames';
import Button from '../common/button';
import { useState } from 'react';
import TextArea from '../common/textarea';

const Comment = (props) => {
  const [isCommentInputOpened, setIsCommentInputOpened] = useState(false);

  const {
    content,
    user_name,
    user_username,
    user_image,
    replies=[],
    isReply=false,
  } = props;

  const replyContent = (reply) => {
    return (
      <>
        <span className="mr-1 font-bold text-purple">
          @{reply.reply_to_username}
        </span>

        {reply.body}
      </>
    )
  }

  return (
    <div className={cn("flex flex-col gap-y-4", {"py-6": !isReply})}>
      <div className="flex items-center justify-between">
        <div className="flex gap-x-4 md:items-start w-full">
          <img className="rounded-full w-10 h-10" src={`${import.meta.env.VITE_BASE_API_URL}/media/${user_image}`} alt={user_name} />
          <div className="flex flex-col w-full">
            <h6 className="font-bold text-[13px] text-secondary-blue">
              {user_name}
            </h6>
            <span className="text-secondary-blue-dim text-[13px]">
              @{user_username}
            </span>

            <p className={cn("hidden text-secondary-blue-dim text-[13px] leading-6 md:block", {"md:mt-4": !isReply, "md:mt-2.5": isReply})}>
              {content}
            </p>

            {
              isCommentInputOpened && (
              <div className="hidden items-start gap-x-2 md:flex mt-6">
                <TextArea />
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
            <TextArea />
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
                replies.map((reply) => (
                  <Comment
                    key={reply.id}
                    content={replyContent(reply)}
                    user={reply.user}
                    isReply={true}
                    user_name={reply.created_by_name}
                    user_username={reply.created_by_username}
                    user_image={reply.created_by_profile_picture}
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
