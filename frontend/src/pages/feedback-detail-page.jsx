import React, { useEffect, useState } from 'react'
import axios from '../utils/axios-instance'
import Button from '../components/common/button'
import SuggestionCard from '../components/suggestions/suggestion-card'
import Comment from '../components/suggestions/comment'
import { Link, useParams } from 'react-router-dom'
import GoBackButton from '../components/common/go-back-button'
import TextArea from '../components/common/textarea'
import cn from 'classnames'

const FeedbackDetailPage = () => {
  const [commentInput, setCommentInput] = useState("");
  const [feedback, setFeedback] = useState(null)
  const TOTAL_CHAR_LIMIT = 250;
  const {feedbackId} = useParams();


  const fetchFeedbackDetails = async () => {
    const data = (await axios.get(`/feedbacks/detail/${feedbackId}/`)).data;
    setFeedback(data);
  }

  useEffect(() => {
    fetchFeedbackDetails();
  }, [])

  if (!feedback) {
    return <div>Loading...</div>
  }

  const categoryValueToName = {
    1: 'Feature',
    2: 'UI',
    3: 'UX',
    4: 'Enhancement',
    5: 'Bug'
  };

  return (
    <div className="px-6 pt-6 pb-24 bg-light-blue min-h-screen md:pt-14">
      <div className="flex flex-col gap-y-6 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <GoBackButton />

          <Link to={`/feedback/edit/${feedbackId}`}>
            <Button colorScheme="blue">Edit Feedback</Button>
          </Link>
        </div>

        {/* Feedback */}
        <SuggestionCard
          id={feedback.id}
          upvotesCount={feedback.upvote_count}
          isUpvotedByCurrentUser={feedback.upvoted_by_current_user}
          title={feedback.title}
          description={feedback.description}
          category={categoryValueToName[feedback.category]}
          commentsCount={feedback.comment_count}
        />

        {/* Comment section */}
        <div className={cn("flex flex-col bg-white pt-6 px-6 rounded-lg", {"pb-6": feedback.comments.length === 0})}>
          <h3>{feedback.comments.length} Comments</h3>

          {/* Comments */}
          <div className="flex flex-col divide-y">
            {
              feedback.comments.map(comment => (
                <Comment
                  key={comment.id}
                  content={comment.body}
                  user_name={comment.created_by_name}
                  user_username={comment.created_by_username}
                  user_image={comment.created_by_profile_picture}
                  replies={comment.replies}
                />
              ))
            }
          </div>
        </div>

        {/* Add comment section */}
        <div className="flex flex-col gap-y-6 bg-white p-6 rounded-lg">
          <h3>Add Comment</h3>

          <div className="flex flex-col gap-y-4">
            <TextArea
              placeholder='Type your comment here'
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />

            <div className="flex items-center justify-between">
              <p className='text-secondary-blue-dim text-[13px]'>{TOTAL_CHAR_LIMIT - commentInput.length} Characters left</p>
              <Button colorScheme="purple" disabled={(TOTAL_CHAR_LIMIT - commentInput.length) < 0}>Post Comment</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedbackDetailPage