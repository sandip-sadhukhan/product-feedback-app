import React from 'react'
import Button from '../common/button'
import SortByDropdown from './sort-by-dropdown';
import suggestionIcon from '../../assets/suggestions/icon-suggestions.svg'
import plusIcon from '../../assets/shared/icon-plus.svg'

const SuggestionsHeader = () => {
  return (
    <div className='w-full py-2 px-6 bg-darkest-blue text-white md:rounded-lg md:px-3.5 md:py-3.5'>
      <div className="flex flex-wrap gap-y-2 items-center justify-between">
        <div className="flex items-center gap-x-[38px]">
          {/* Logo & heading */}
          <div className="hidden items-center gap-x-4 md:flex">
            <img src={suggestionIcon} alt="Suggestion icon" />
            <h3 className="text-white">6 Suggestions</h3>
          </div>

          <SortByDropdown />
        </div>

        <Button>
          <img src={plusIcon} alt="Plus icon" width={12} />
          Add Feedback
        </Button>
      </div>
    </div>
  )
}

export default SuggestionsHeader