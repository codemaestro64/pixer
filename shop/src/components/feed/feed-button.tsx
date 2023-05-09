import React from "react";

interface FeedButtonProps {
  label: String;
  icon: React.ReactElement;
  isLarge?: Boolean;
  isActive?: Boolean;
}

export default function FeedButton({ label, icon, isLarge, isActive }: FeedButtonProps) {
  return (
    <button className={`flex items-center justify-center font-poppins w-full h-[41.34px] py-[11.64px] pl-[25.84px] pr-[25.84px] border rounded-[86.12px] cursor-pointer ${!isLarge ? "font-semibold text-[12.06px] h-[41.34px]" : "font-medium text-[13.04px] h-[48px]"} ${!isActive ? "text-dark-850 dark:text-[#434343] bg-[#f8f8f8] dark:bg-dark-100 border-[#D5D5D5] dark:border-[#434343]" : "text-white bg-brand dark:bg-[rgba(3,101,82,0.16)] border-brand"}`}>
      <span>
        { React.cloneElement(icon, { className: !isLarge ? "h-[18px] w-[18px]" :"h-[19.57px] w-[19.57px]" }) }
      </span>
      <span className="inline-block ml-[13.4px]">
        { label }
      </span>
    </button>
  )
}