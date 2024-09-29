import React from "react";
import cn from "classnames";

const UpvoteBox = ({ count, isActive = false }) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-y-2 px-2 py-3.5 pb-2 min-w-10 rounded-lg cursor-pointer",
        { "bg-light-blue hover:bg-[#CFD7FF]": !isActive },
        { "bg-dark-blue hover:opacity-90": isActive }
      )}
    >
      <svg className="w-2.5 h-2" xmlns="http://www.w3.org/2000/svg">
        <path
          className={cn({ "stroke-white": isActive })}
          d="M1 6l4-4 4 4"
          stroke="#4661E6"
          stroke-width="2"
          fill="none"
          fill-rule="evenodd"
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
