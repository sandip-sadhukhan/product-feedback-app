import React, { useState } from 'react'
import arrowLeftIcon from '../assets/shared/icon-arrow-left.svg'
import Button from '../components/common/button'
import SuggestionCard from '../components/suggestions/suggestion-card'
import Comment from '../components/suggestions/comment'
import { Link } from 'react-router-dom'
import GoBackButton from '../components/common/go-back-button'
import TextArea from '../components/common/textarea'

const FeedbackDetailPage = () => {
  const [comment, setComment] = useState("");
  const TOTAL_CHAR_LIMIT = 250;
  
  const suggestion = {
    "id": 2,
    "title": "Add a dark theme option",
    "category": "feature",
    "upvotes": 99,
    "status": "suggestion",
    "description": "It would help people with light sensitivities and who prefer dark mode.",
    "comments": [
      {
        "id": 3,
        "content": "Also, please allow styles to be applied based on system preferences. I would love to be able to browse Frontend Mentor in the evening after my device’s dark mode turns on without the bright background it currently has.",
        "user": {
          "image": "/user-images/image-elijah.jpg",
          "name": "Elijah Moss",
          "username": "hexagon.bestagon"
        }
      },
      {
        "id": 4,
        "content": "Second this! I do a lot of late night coding and reading. Adding a dark theme can be great for preventing eye strain and the headaches that result. It’s also quite a trend with modern apps and  apparently saves battery life.",
        "user": {
          "image": "/user-images/image-james.jpg",
          "name": "James Skinner",
          "username": "hummingbird1"
        },
        "replies": [
          {
            "content": "While waiting for dark mode, there are browser extensions that will also do the job. Search for 'dark theme' followed by your browser. There might be a need to turn off the extension for sites with naturally black backgrounds though.",
            "replyingTo": "hummingbird1",
            "user": {
              "image": "/user-images/image-anne.jpg",
              "name": "Anne Valentine",
              "username": "annev1990"
            }
          },
          {
            "content": "Good point! Using any kind of style extension is great and can be highly customizable, like the ability to change contrast and brightness. I'd prefer not to use one of such extensions, however, for security and privacy reasons.",
            "replyingTo": "annev1990",
            "user": {
              "image": "/user-images/image-ryan.jpg",
              "name": "Ryan Welles",
              "username": "voyager.344"
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="px-6 pt-6 pb-24 bg-light-blue min-h-screen md:pt-14">
      <div className="flex flex-col gap-y-6 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <GoBackButton url="/" />

          <Button colorScheme="blue">Edit Feedback</Button>
        </div>

        {/* Feedback */}
        <SuggestionCard
          id={suggestion.id}
          upvotesCount={suggestion.upvotes}
          isUpvotedByCurrentUser={false}
          title={suggestion.title}
          description={suggestion.description}
          category={suggestion.category}
          commentsCount={suggestion.comments?.length || 0}
        />

        {/* Comment section */}
        <div className="flex flex-col bg-white pt-6 px-6 rounded-lg">
          <h3>4 Comments</h3>

          {/* Comments */}
          <div className="flex flex-col divide-y">
            {
              suggestion.comments.map(comment => (
                <Comment
                  key={comment.id}
                  content={comment.content}
                  user={comment.user}
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
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <div className="flex items-center justify-between">
              <p className='text-secondary-blue-dim text-[13px]'>{TOTAL_CHAR_LIMIT - comment.length} Characters left</p>
              <Button colorScheme="purple">Post Comment</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedbackDetailPage