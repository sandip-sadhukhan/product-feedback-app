import React from "react";
import cn from "classnames";

const Tag = ({ name, isActive = false }) => {
  return (
    <div
      className={cn("text-[13px] py-1.5 px-4 rounded-lg font-semibold cursor-pointer", {
        "text-dark-blue bg-light-blue": !isActive,
        "text-white bg-dark-blue": isActive,
      })}
    >
      {name}
    </div>
  );
};

export default Tag;
