import React from "react"

export default function FeedButtonAlt({ icon, label }: { icon: React.ReactElement, label: String }) {
  return (
    <button className='flex items-center justify-center w-[53.23px] md:w-auto md:px-[26px] h-[46px] bg-[#f7f7f7] dark:bg-[rgba(7,84,55,0.13)] text-[12px] 2xl:text-[14.15px] text-brand font-medium font-poppins rounded-[88.46px] cursor-pointer'>
      <span>
        { React.cloneElement(icon, { className: "h-[21.23px] w-[21.23px]"}) }
      </span>
      <span className="hidden md:inline-block md:ml-[12px] dark:text-white">
        { label }
      </span>
    </button>
  )
}