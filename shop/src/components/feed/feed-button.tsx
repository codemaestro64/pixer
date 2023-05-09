import React, { useState } from "react";

interface FeedButtonProps {
  label: String;
  icon: React.ReactElement;
  isLarge?: Boolean;
  isActive?: Boolean;
}

export default function FeedButton({ label, icon, isLarge, isActive = false }: FeedButtonProps) {
  const [activeBtn, setActiveBtn] = useState(isActive);

  function toggleActiveBtn() {
    setActiveBtn(prev => !prev);
  }
    
  return (
    <button className={`flex items-center justify-center w-full h-[41.34px] py-[11.64px] pl-[25.84px] pr-[25.84px] border rounded-[86.12px] cursor-pointer ${!isLarge ? "font-semibold text-[12.05px] md:text-[14px] h-[41.34px]" : "font-medium text-[13.04px] md:text-[16px] 2xl:text-[18px] h-[48px] 2xl:h-[59px] 2xl:px-[30px]"} ${!activeBtn ? "text-dark-850 dark:text-[#434343] bg-[#f8f8f8] dark:bg-dark-100 border-[#D5D5D5] dark:border-[#434343]" : "text-white bg-brand dark:bg-[rgba(3,101,82,0.16)] border-brand"}`} onClick={toggleActiveBtn}>
      <span>
        { React.cloneElement(icon, { className: !isLarge ? "h-[18px] md:h-[22px] w-[18px] md:w-[22px]" : "h-[19.57px] w-[19.57px] md:h-[24px] md:w-[24px]" }) }
      </span>
      <span className="inline-block ml-[13.4px] font-poppins">
        { label }
      </span>
    </button>
  )
}