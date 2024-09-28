import React from 'react'
import Button from '../common/button'

const SuggestionsHeader = () => {
  return (
    <div className='w-full p-3.5 bg-darkest-blue text-white rounded-lg'>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-[38px]">
          {/* Logo & heading */}
          <div className="flex items-center gap-x-4">
            <img src="/public/assets/suggestions/icon-suggestions.svg" alt="Suggestion icon" />
            <h3 className="text-white">6 Suggestions</h3>
          </div>

          <div className='flex items-center gap-x-1'>
            <span>Sort by :</span>
            <div className='flex items-center gap-x-2'>
              <h4 className='text-white'>Most Upvotes</h4>
              <img src="/public/assets/suggestions/arrow-down-white.svg" alt="arrow down" />
            </div>
          </div>
        </div>

        {/* <button className='flex items-center gap-2'><img src="/public/assets/shared/icon-plus.svg" alt="Plus icon" /> Add Feedback</button> */}
        <Button>
          <img src="/public/assets/shared/icon-plus.svg" alt="Plus icon" width={12} />
          Add Feedback
        </Button>
      </div>
    </div>
  )
}

export default SuggestionsHeader