import React from 'react'
import cn from 'classnames'
import TagsBox from './tags-box'
import RoadMapBox from './roadmap-box'

const MobileSidebar = ({isSidebarOpen}) => {
  return (
    <div className={cn("fixed top-0 z-20 duration-100 bg-light-blue p-6 h-screen w-[271px]", {'right-[-300px]': !isSidebarOpen, 'right-0': isSidebarOpen})}>
      <div className="flex flex-col gap-y-6 pt-20">
        <TagsBox />
        <RoadMapBox />
      </div>
    </div>
  )
}

export default MobileSidebar