import React from 'react';
import { PictureIcon } from '../icons/picture-icon';
import { VideoIcon } from '../icons/video-icon';
import { ChatPullFillIcon } from '../icons/chat-pull-fill-icon';
import { AttachmentAltIcon } from '../icons/attachment-alt-icon';

function PostButton({ label, icon }: { label: string, icon: React.ReactElement }) {
  return (
    <button className='flex items-center px-[16px] py-[12.38px] text-brand bg-[#F6F6F6] dark:bg-[#07543721] rounded-[88.46px]'>
      <div>
        { React.cloneElement(icon, {
          className: 'w-[21.23px] h-[21.23px] text-brand',
        }) }
      </div>
      {/* <div className=''>
        { label }
      </div> */}
    </button>
  )
}

export default function CommunityPostActions() {
  return (
    <div className='bg-white dark:bg-[#292929] py-[10px] px-[20px] flex items-center justify-between rounded-[10px] overflow-hidden'>
      <div className='flex gap-[12px]'>
        <PostButton label='Images' icon={<PictureIcon />} />
        <PostButton label='Video' icon={<VideoIcon />} />
        <PostButton label='Poll' icon={<ChatPullFillIcon />} />
        <PostButton label='Attachment' icon={<AttachmentAltIcon />} />
      </div>
      <div>
        <button className='h-[42.46px] w-[80px] text-[12.38px] text-white font-poppins font-semibold bg-brand flex items-center justify-center rounded-[88.46px]'>
          Post
        </button>
      </div>
    </div>
  )
}