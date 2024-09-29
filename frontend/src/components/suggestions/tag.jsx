import React from "react";
import cn from "classnames";

const Tag = ({ children, isActive = false }) => {
  return (
    <div
      className={cn("text-[13px] py-1.5 px-4 rounded-lg font-semibold cursor-pointer", {
        "text-dark-blue bg-light-blue hover:bg-[#CFD7FF]": !isActive,
        "text-white bg-dark-blue hover:opacity-90": isActive,
      })}
    >
      {children}
    </div>
  );
};

export default Tag;
