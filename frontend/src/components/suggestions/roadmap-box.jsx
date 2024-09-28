import React from 'react'

const RoadMapBox = () => {
  const columns = [
    {name: "Planned", count: 2, circle_bg: "bg-light-orange"},
    {name: "In-Progress", count: 3, circle_bg: "bg-purple"},
    {name: "Live", count: 1, circle_bg: "bg-sky-blue"}
  ];

  return (
    <div className='bg-white p-6 rounded-lg flex flex-col gap-y-6'>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2>Roadmap</h2>
        <a href="#" className='text-[13px] text-dark-blue underline font-semibold'>View</a>
      </div>

      {/* Columns */}
      <div className="flex flex-col gap-y-1.5">
        {/* Each Column */}
        {
          columns.map(column => (
            <div key={column.name} className="flex items-center justify-between text-secondary-blue-dim text-[16px]">
              {/* Dot and Name */}
              <div className="flex gap-x-4 items-center">
                <span className={`w-2 h-2 rounded-full ${column.circle_bg}`}></span>
                <span>{column.name}</span>
              </div>
              {/* Count */}
              <div className='font-bold'>{column.count}</div>
            </div>
          ))
        }

      </div>



    </div>
  )
}

export default RoadMapBox