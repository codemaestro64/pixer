import React from 'react';
import { BookmarkIcon } from "../icons/bookmark-icon"
import { LinkIcon } from "../icons/link-icon"
import { NotificationIcon } from "../icons/notification-icon"

function InteractionButton({ icon }: { icon: React.ReactElement }) {
  return (
    <button className='h-[34.27px] md:h-[53.28px] 3xl:h-[62px] w-[34.27px] md:w-[53.28px] 3xl:w-[62px] border border-[#ECECEC] dark:border-[#4B4B4B] text-[#2A2A2A] dark:text-[#d5d5d5] flex items-center justify-center rounded-full'>
      { React.cloneElement(icon, { className: 'w-[13.26px] md:w-[20.62px] 3xl:w-[24px] h-[13.26px] md:h-[20.62px] 3xl:h-[24px]' }) }
    </button>
  )
}

function FollowButton() {
  return (
    <button className='h-[34.27px] md:h-[53.28px] 3xl:h-[62px] px-[16.58px] md:px-[25.78px] 3xl:pd-[30px] text-[9.95px] md:text-[15.47px] 3xl:text-[18px] text-white font-poppins font-medium rounded-[55px] bg-brand dark:bg-[#28C98C]'>Follow</button>
  )
}

export default function ContentInteractions() {
  return (
    <>
      <div className='flex gap-[13.26px] md:gap-[20.62px] 3xl:gap-[24px]'>
        <InteractionButton icon={<BookmarkIcon />} />
        <InteractionButton icon={<LinkIcon />} />
        <InteractionButton icon={<NotificationIcon />} />
      </div>
      <div className='ml-[14px] md:ml-[28.79px] 3xl:ml-[33.5px]'>
        <FollowButton />
      </div>
    </>
  )
}