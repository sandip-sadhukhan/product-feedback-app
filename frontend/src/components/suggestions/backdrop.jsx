import React from 'react'

const BackDrop = ({onClick}) => {
  return (
    <div className="fixed top-0 left-0 z-10 w-full h-full bg-black opacity-60" onClick={onClick}></div>
  )
}

export default BackDrop