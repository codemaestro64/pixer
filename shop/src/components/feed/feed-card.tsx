import React from 'react';
import Image from '@/components/ui/image';
import FeedCardImage from '@/components/feed/feed-card-image';
import { HeartIcon } from '../icons/heart-icon';
import { HeartFillIcon } from '../icons/heart-fill';
import { ChatIcon } from '../icons/chat-icon';
import { ShareIcon } from '../icons/share-icon';
import { EllipsisVerticalIcon } from '../icons/ellipsis-vertical-icon';

interface FeedCardProps {
  appName: String;
  teamName: String;
  teamImage: StaticImageData;
  cardImage: StaticImageData;
  interactions?: {
    likes: Number | String;
    comments: Number | String;
  }
}

interface FeedCardButtonProps { 
  icon: React.ReactElement;
  label?: String;
  fillIcon?: React.ReactElement;
  menu?: Boolean;
}

function FeedCardButton({ label, icon, fillIcon, menu }: FeedCardButtonProps) {
  const iconStyle = 'w-[25.69px] h-[25.69px] md:w-[24.02px] md:h-[24.02px] 2xl:w-[27.62px] 2xl:h-[27.62px]'

  return (
    <button className={`flex items-center cursor-pointer ${!menu ? 'font-poppins text-dark-300 dark:text-white text-[14.99px] md:text-[14.01px] 2xl:text-[16.11px] font-medium' : 'text-dark-700'}`}>
      <span className='inline-block mr-[6.42px] relative'>
        {React.cloneElement(icon, { className: !menu ? iconStyle : 'w-[22.32px] h-[22.32px] md:w-[20.86px] md:h-[20.86px] 2xl:w-[24px] 2xl:h-[24px]' })}
        {fillIcon ? React.cloneElement(fillIcon, { className: `${iconStyle} absolute bottom-[4px] text-brand-dark` }) : null}
      </span>
      <span>{label}</span>
    </button>
  )
}

export default function FeedCard({appName, teamName, teamImage, cardImage, interactions = { likes: '1.2k', comments: '200' }}: FeedCardProps) {
  return (
    <div className='group bg-[#f3f3f3] dark:bg-[#292929] rounded-[9.6px] pb-[14px] hover:shadow-feed-card transition-shadow duration-300'>
      <div className='flex pt-[30.69px] px-[20.5px] pb-[21.56px]'>
        <div className='flex items-center w-[46.8px] mr-[5.58px] rounded-full overflow-hidden'>
          <Image src={teamImage} alt='Team Project' height={48} width={48} />
        </div>
        <div className='font-poppins max-w-[224.13px]'>
          <p className='text-[14.88px] md:text-[13.91px] 2xl:text-[16px] font-semibold text-dark-300 dark:text-white mb-[4px]'>{appName}</p>
          <span className='italic text-[13.02px] md:text-[12.17px] 2xl:text-[14px] font-medium text-dark-700'>{teamName}</span>
        </div>
      </div>

      <div className='px-[20px]'>
        <FeedCardImage cardImage={cardImage} />
      </div>

      <div className='mt-[22.32px]'>
        <div className='p-[12.85px] flex items-center'>
          <div className='ml-[12px] flex gap-[21.41px]'>
            <FeedCardButton label={interactions.likes.toString()} icon={<HeartIcon />} fillIcon={<HeartFillIcon />} />
            <FeedCardButton label={interactions.comments.toString()} icon={<ChatIcon />} />
            <FeedCardButton icon={<ShareIcon />} />
          </div>
          <div className='ml-auto mr-1'>
            <FeedCardButton icon={<EllipsisVerticalIcon />} menu />
          </div>
        </div>
      </div>
    </div>
  )
}