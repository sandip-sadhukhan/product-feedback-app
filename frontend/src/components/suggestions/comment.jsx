import cn from 'classnames';

const Comment = (props) => {
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
        <div className="flex gap-x-4">
          <img className="rounded-full w-10" src={image} alt={name} />
          <div className="flex flex-col">
            <h6 className="font-bold text-[13px] text-secondary-blue">
              {name}
            </h6>
            <span className="text-secondary-blue-dim text-[13px]">
              @{username}
            </span>
          </div>
        </div>

        <button className="text-dark-blue font-semibold text-[13px]">
          Reply
        </button>
      </div>

      <p className="text-secondary-blue-dim text-[13px] leading-6">
        {content}
      </p>

      {
        replies.length > 0 && (
          <div className="relative">
            <div className="flex flex-col pl-6 gap-y-3">
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

            {/* left border */}
            <div className="absolute left-0 top-6 w-px h-[216px] bg-secondary-blue-dim opacity-10"></div>
          </div>
        )
      }
    </div>
  );
};

export default Comment;
