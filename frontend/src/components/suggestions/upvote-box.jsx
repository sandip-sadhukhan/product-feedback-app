import React from "react";
import cn from "classnames";

const UpvoteBox = ({ count, isActive = false, showHorizontal=false }) => {
  return (
    <div
      className={cn(
        "flex flex-row items-center justify-center px-4 py-2.5 rounded-lg cursor-pointer min-w-[69px] gap-x-1.5",
        { "bg-light-blue hover:bg-[#CFD7FF]": !isActive },
        { "bg-dark-blue hover:opacity-90": isActive },
        {"md:py-3.5 md:px-2 md:gap-y-2  md:flex-col md:min-w-10": !showHorizontal}
      )}
    >
      <svg className="w-2.5 h-2" xmlns="http://www.w3.org/2000/svg">
        <path
          className={cn({ "stroke-white": isActive })}
          d="M1 6l4-4 4 4"
          stroke="#4661E6"
          strokeWidth="2"
          fill="none"
          fillRule="evenodd"
        />
      </svg>
      <span
        className={cn("text-[13px] font-bold leading-none", {
          "text-secondary-blue": !isActive,
          "text-white": isActive,
        })}
      >
        {count}
      </span>
    </div>
  );
};

export default UpvoteBox;
