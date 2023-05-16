import React from 'react';
import { LikeOutlineIcon } from '../icons/like-outline-icon';
import { CommentOutlineIcon } from '../icons/comment-outline-icon';

function SocialButton({ label, icon }: { label: string, icon: React.ReactElement}) {
  return (
    <button className='text-[14.7px] md:text-[17.84px] 3xl:text-[20.27px] text-[#3a3a3a] dark:text-[#dedede] font-poppins font-semibold flex gap-[10.11px] 3xl:gap-[14px]'>
      <span>
        { React.cloneElement(icon, { className: 'w-[22.05px] md:w-[26.75px] 3xl:w-[30.41px] h-[22.05px] md:h-[26.75px] 3xl:h-[30.41px]' }) }
      </span>
      <span>{ label }</span>
    </button>
  )
}

export default function ContentSocial() {
  return (
    <div className='flex gap-[18.85px] md:gap-[22.87px] 3xl:gap-[26px] ml-[4.25px] md:self-end md:mr-[8px]'>
      <SocialButton label='2.3k' icon={<LikeOutlineIcon />} />
      <SocialButton label='200' icon={<CommentOutlineIcon />} />
    </div>
  )
}