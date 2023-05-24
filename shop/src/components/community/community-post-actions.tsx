import React from 'react';
import { PictureIcon } from '../icons/picture-icon';
import { VideoIcon } from '../icons/video-icon';
import { ChatPullFillIcon } from '../icons/chat-pull-fill-icon';
import { AttachmentAltIcon } from '../icons/attachment-alt-icon';

function PostButton({ label, icon }: { label: string, icon: React.ReactElement }) {
  return (
    <button className='flex items-center px-[16px] sm:px-[19px] 2xl:px-[26px] py-[12.38px] sm:py-[9px] 2xl:py-[12px] text-brand bg-[#F6F6F6] dark:bg-[#07543721] rounded-[88.46px]'>
      <div className='sm:mr-[10px] 2xl:mr-[14.15px]'>
        { React.cloneElement(icon, {
          className: 'w-[21.23px] sm:w-[15.24px] xl:w-[18px] 2xl:w-[21.23px] h-[21.23px] sm:h-[15.24px] xl:h-[18px] 2xl:h-[21.23px] text-brand',
        }) }
      </div>
      <div className='hidden sm:block text-[10.16px] xl:text-[12px] 2xl:text-[14.15px] text-dark-300 dark:text-white font-poppins font-medium'>
        { label }
      </div>
    </button>
  )
}

export default function CommunityPostActions() {
  return (
    <div className='bg-white dark:bg-[#292929] py-[10px] sm:py-[18px] 2xl:py-[26px] px-[20px] sm:px-[74px] flex items-center justify-between rounded-[10px] sm:rounded-[14.35px] 2xl:rounded-[20px] overflow-hidden'>
      <div className='flex gap-[12px] sm:gap-[8px] 2xl:gap-[12px] flex-wrap'>
        <PostButton label='Images' icon={<PictureIcon />} />
        <PostButton label='Video' icon={<VideoIcon />} />
        <PostButton label='Poll' icon={<ChatPullFillIcon />} />
        <PostButton label='Attachment' icon={<AttachmentAltIcon />} />
      </div>
      <div>
        <button className='h-[42.46px] sm:h-[30.47px] xl:h-[36px] 2xl:h-[42.46px] w-[80px] sm:w-[58.09px] xl:w-[68px] 2xl:w-[80px] text-[12.38px] sm:text-[9px] xl:text-[12px] 2xl:text-[12.38px] text-white font-poppins font-semibold bg-brand flex items-center justify-center rounded-[88.46px]'>
          Post
        </button>
      </div>
    </div>
  )
}