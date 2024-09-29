import React from 'react'
import Button from '../common/button'
import SortByDropdown from './sort-by-dropdown';

const SuggestionsHeader = () => {
  return (
    <div className='w-full py-2 px-6 bg-darkest-blue text-white md:rounded-lg md:px-3.5 md:py-3.5'>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-[38px]">
          {/* Logo & heading */}
          <div className="hidden items-center gap-x-4 md:flex">
            <img src="/public/assets/suggestions/icon-suggestions.svg" alt="Suggestion icon" />
            <h3 className="text-white">6 Suggestions</h3>
          </div>

          <SortByDropdown />
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