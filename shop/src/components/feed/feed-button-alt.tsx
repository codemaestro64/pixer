import React from "react"

export default function FeedButtonAlt({ icon }: { icon: React.ReactElement }) {
  return (
    <button className='flex items-center justify-center w-[53.23px] h-[46px] bg-[#f7f7f7] dark:bg-[rgba(7,84,55,0.13)] text-brand rounded-[88.46px]'>
      <span>
        { React.cloneElement(icon, { className: "h-[21.23px] w-[21.23px]"}) }
      </span>
    </button>
  )
}