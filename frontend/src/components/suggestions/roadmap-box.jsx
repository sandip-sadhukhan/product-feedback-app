import React from "react";
import cn from "classnames";

const RoadMapBox = () => {
  const columns = [
    { name: "Planned", count: 2, circle_bg: "bg-light-orange" },
    { name: "In-Progress", count: 3, circle_bg: "bg-purple" },
    { name: "Live", count: 1, circle_bg: "bg-sky-blue" },
  ];

  const isViewBtnDisabled = !columns.some((column) => column.count > 0);

  return (
    <div className="bg-white p-6 rounded-lg flex-1 flex flex-col gap-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2>Roadmap</h2>
        <a
          href="#"
          className={cn("text-[13px] text-dark-blue underline font-semibold", {
            "opacity-25 cursor-not-allowed": isViewBtnDisabled,
          })}
        >
          View
        </a>
      </div>

      {/* Columns */}
      <div className="flex flex-col gap-y-1.5">
        {/* Each Column */}
        {columns.map((column) => (
          <div
            key={column.name}
            className="flex items-center justify-between text-secondary-blue-dim text-[16px]"
          >
            {/* Dot and Name */}
            <div className="flex gap-x-4 items-center">
              <span
                className={`w-2 h-2 rounded-full ${column.circle_bg}`}
              ></span>
              <span>{column.name}</span>
            </div>
            {/* Count */}
            <div className="font-bold">{column.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadMapBox;
