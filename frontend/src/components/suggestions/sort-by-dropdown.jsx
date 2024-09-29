import React, { useEffect, useState } from 'react'
import cn from "classnames"

const SortByDropdown = ({disabled= false}) => {
  const [sortBy, setSortBy] = useState("least-upvotes");
  const sortByOptions = [
    {option: "Most Upvotes", value: "most-upvotes"},
    {option: "Least Upvotes", value: "least-upvotes"},
    {option: "Most Comments", value: "most-comments"},
    {option: "Least Comments", value: "least-comments"},
  ];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const currentSortBy = sortByOptions.find(option => option.value === sortBy);

  const handleOptionClick = (event, value) => {
    event.stopPropagation();
    setSortBy(value);
    setIsDropdownOpen(false);
  }

  const toggleDropdownClick = (event) => {
    event.stopPropagation();

    if (disabled) {
      return;
    }

    setIsDropdownOpen(prev => !prev)
  }

  const handleOutsideClick = (event) => {
    event.stopPropagation();
    setIsDropdownOpen(false);
  }

  useEffect(() => {
    document.body.addEventListener("click", handleOutsideClick)

    return () => document.body.removeEventListener("click", handleOutsideClick);
  });
  return (
    <div className='relative'>
      <div
        className={cn('flex items-center gap-x-1 cursor-pointer', {'opacity-70': isDropdownOpen, 'opacity-25 cursor-not-allowed': disabled})}
        onClick={(event) => toggleDropdownClick(event)}
      >
        <span>Sort by :</span>
        <div className='flex items-center gap-x-2'>
          <h4 className='text-white'>{currentSortBy.option}</h4>
          <img className={cn({'rotate-180': isDropdownOpen})} src="/public/assets/suggestions/arrow-down-white.svg" alt="arrow down" />
        </div>
      </div>

      <div className={cn("absolute top-10 left-0 flex-col min-w-64 bg-white text-black text-[16px] rounded-lg shadow-lg divide-y", {'flex': isDropdownOpen, 'hidden': !isDropdownOpen})}>
        {/* Each options */}
        {
          sortByOptions.map(option => (
            <div key={option.value} className="flex items-center justify-between py-3 px-6 cursor-pointer group" onClick={(event) => handleOptionClick(event, option.value)}>
              <span className='group-hover:text-purple'>{option.option}</span>
              {
                option.value === currentSortBy.value && (
                  <img src="/public/assets/shared/icon-check.svg" alt="checked" />
                )
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default SortByDropdown