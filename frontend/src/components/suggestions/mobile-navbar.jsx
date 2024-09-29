import React, { useState } from 'react'
import MobileSidebar from './mobile-sidebar';
import BackDrop from './backdrop';

const MobileNavbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  }

  return (
    <div className="w-full h-[86px] md:hidden">
      <div className='fixed z-30 top-0 left-0 flex items-center justify-between color-box py-4 px-6 w-full'>
        <div className="flex flex-col">
          <h2 className='text-white'>Frontend Mentor</h2>
          <h3 className='text-white font-medium text-[15px] tracking-normal opacity-75'>Feedback Board</h3>
        </div>

        <button className="cursor-pointer" onClick={handleToggleSidebar}>
          {
            isSidebarOpen ? (
              <img src="/public/assets/shared/mobile/icon-close.svg" alt="Close menu" />
            ) : (
              <img src="/public/assets/shared/mobile/icon-hamburger.svg" alt="Open menu" />
            )
          }
        </button>
      </div>

      {/* Backdrop */}
      {
        isSidebarOpen && <BackDrop onClick={handleToggleSidebar} />
      }

      {/* Mobile Sidebar */}
      <MobileSidebar isSidebarOpen={isSidebarOpen} />
    </div>
  )
}

export default MobileNavbar