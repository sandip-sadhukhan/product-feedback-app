import React from "react";
import cn from "classnames";

const Tag = ({ children, isActive = false, noHover=false, onClick }) => {
  return (
    <div
      className={cn("text-[13px] py-1.5 px-4 rounded-lg font-semibold", {
        "text-dark-blue bg-light-blue": !isActive,
        "text-white bg-dark-blue": isActive,
        "hover:bg-[#CFD7FF]": !isActive && !noHover,
        "hover:opacity-90": isActive && !noHover,
        "cursor-pointer": !noHover,
        "cursor-default": noHover,
      })}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Tag;
