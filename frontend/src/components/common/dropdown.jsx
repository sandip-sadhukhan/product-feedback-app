import React, { useEffect, useState } from "react";
import cn from "classnames";
import arrowDownIcon from "../../assets/shared/icon-arrow-down.svg";
import checkIcon from "../../assets/shared/icon-check.svg";

const Dropdown = ({ value, options, onOptionClick, disabled = false }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  let currentCategoryOption = options.find((option) => option.value === value);

  if (!currentCategoryOption) {
    currentCategoryOption = options[0];
  }

  const handleOptionClick = (event, value) => {
    event.stopPropagation();
    onOptionClick(value);
    setIsDropdownOpen(false);
  };

  const toggleDropdownClick = (event) => {
    event.stopPropagation();

    if (disabled) {
      return;
    }

    setIsDropdownOpen((prev) => !prev);
  };

  const handleOutsideClick = (event) => {
    event.stopPropagation();
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    document.body.addEventListener("click", handleOutsideClick);

    return () => document.body.removeEventListener("click", handleOutsideClick);
  });

  return (
    <div className="relative select-none" type="text">
      <div
        className={cn(
          "flex items-center justify-between bg-lightest-blue text-secondary-blue px-6 py-[13px] text-[15px] rounded-md cursor-pointer",
          { "outline outline-dark-blue": isDropdownOpen }
        )}
        onClick={toggleDropdownClick}
      >
        <span>{currentCategoryOption.label}</span>
        <img src={arrowDownIcon} alt="arrow" />
      </div>

      {/* Options */}
      {isDropdownOpen && (
        <div
          className={cn(
            "absolute top-16 left-0 w-full flex-col bg-white text-black text-[16px] rounded-lg border drop-shadow-xl divide-y",
            { flex: isDropdownOpen, hidden: !isDropdownOpen }
          )}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className="flex items-center justify-between py-3 px-6 cursor-pointer group"
              onClick={(event) => handleOptionClick(event, option.value)}
            >
              <span className="group-hover:text-purple">{option.label}</span>
              {option.value === currentCategoryOption.value && (
                <img src={checkIcon} alt="checked" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
