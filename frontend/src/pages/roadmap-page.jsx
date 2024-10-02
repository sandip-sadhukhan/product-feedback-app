import React, { useState } from 'react'
import cn from 'classnames';
import GoBackButton from '../components/common/go-back-button'
import { Link } from 'react-router-dom'
import Button from '../components/common/button'
import plusIconImg from '../assets/shared/icon-plus.svg'
import RoadmapCard from '../components/roadmap/roadmap-card';

const RoadmapPage = () => {
  const [mobileSelectedColumnId, setMobileSelectedColumnId] = useState(2);
  const columns = [
    {
      id: 1,
      label: "Planned",
      value: "planned",
      description: "Ideas prioritized for research",
      count: 2,
    },
    {
      id: 2,
      label: "In-Progress",
      value: 'in-progress',
      description: "Features currently being developed",
      count: 3,
    },
    {
      id: 3,
      label: "Live",
      value: 'live',
      description: "Released features",
      count: 1,
    }
  ]
  const mobileSelectedColumn = columns.find(column => column.id == mobileSelectedColumnId);

  return (
    <div className="bg-lightest-blue min-h-screen">
      <div className='max-w-6xl mx-auto md:px-10 md:py-14'>
        {/* Header */}
        <div className="flex items-center justify-between bg-darkest-blue px-6 py-[26px] md:rounded-lg">
          <div className="flex flex-col gap-y-[3px]">
            <GoBackButton className="text-white" />
            <h3 className="text-white md:text-2xl">Roadmap</h3>
          </div>

          <Link to="/feedback/add">
            <Button>
              <img src={plusIconImg} alt="Plus icon" width={12} />
              Add Feedback
            </Button>
          </Link>
        </div>

        {/* Mobile Column Nav */}
        <div className="flex justify-between font-bold text-[13px] text-secondary-blue text-center border-b md:hidden">
          {
            columns.map(column => (
              <div onClick={() => setMobileSelectedColumnId(column.id)} className={cn("flex-1 py-5 cursor-pointer", {"opacity-40": mobileSelectedColumnId !== column.id, "border-b-[4.5px] border-purple": mobileSelectedColumnId === column.id})}>
                <h5>{column.label} ({column.count})</h5>
              </div>
            ))
          }
        </div>

        {/* Mobile Column */}
        <div className="flex flex-col gap-y-6 p-6 md:hidden">
          <div className="flex flex-col gap-y-2">
            <h3>{mobileSelectedColumn.label} ({mobileSelectedColumn.count})</h3>
            <p className='text-sm text-secondary-blue-dim'>
              {mobileSelectedColumn.description}
            </p>
          </div>

          <div className="flex flex-col gap-y-6">
            <RoadmapCard
              statusValue={mobileSelectedColumn.value}
              statusLabel={mobileSelectedColumn.label}
              title="One-click portfolio generation"
              description="Add ability to create professional looking portfolio from profile"
              upvoteCount={62}
              isUpvotedByCurrentUser={false}
              category="feature"
              commentCount={2}
            />
            <RoadmapCard
              statusValue={mobileSelectedColumn.value}
              statusLabel={mobileSelectedColumn.label}
              title="One-click portfolio generation"
              description="Add ability to create professional looking portfolio from profile"
              upvoteCount={62}
              isUpvotedByCurrentUser={false}
              category="feature"
              commentCount={2}
            />
          </div>
        </div>

        {/* Tablet & Above Columns */}
        <div className="hidden py-8 gap-x-2.5 md:flex lg:gap-x-8">
          {
            columns.map(column => (
              <div className="flex flex-1 flex-col gap-y-6">
                <div className="flex flex-col gap-y-2">
                  <h3>{column.label} ({column.id})</h3>
                  <p className='text-sm text-secondary-blue-dim'>
                    {column.description}
                  </p>
                </div>

                <div className="flex flex-col gap-y-4">
                  <RoadmapCard
                    statusValue={column.value}
                    statusLabel={column.label}
                    title="One-click portfolio generation"
                    description="Add ability to create professional looking portfolio from profile"
                    upvoteCount={62}
                    isUpvotedByCurrentUser={false}
                    category="feature"
                    commentCount={2}
                  />
                  <RoadmapCard
                    statusValue={column.value}
                    statusLabel={column.label}
                    title="One-click portfolio generation"
                    description="Add ability to create professional looking portfolio from profile"
                    upvoteCount={62}
                    isUpvotedByCurrentUser={false}
                    category="feature"
                    commentCount={2}
                  />
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default RoadmapPage