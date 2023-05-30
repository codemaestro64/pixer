import React from 'react';
import NotificationComponent from './notification-component';
import publisherLogo from '@/assets/images/publisher-logo.png';
import publisherLogoTwo from '@/assets/images/omnico-team.png';

export default function NotificationModal() {
  const notifications = [
    {
      variant: 'new_publish',
      author: 'betasoft',
      image: publisherLogo,
      time: '10:30 AM',
    },
    {
      variant: 'trade_success',
      authors: [
        {
          author: 'betasoft',
          image: publisherLogo,
        },
        {
          author: 'omnico-team',
          image: publisherLogoTwo,
        },
      ],
      time: 'Yesterday',
    },
    {
      variant: 'new_update',
      message: 'New Update, See what’s new',
      time: '10:30 AM',
    },
    {
      variant: 'new_publish',
      author: 'betasoft',
      image: publisherLogo,
      time: '10:30 AM',
    },
    {
      variant: 'post_like',
      author: 'quatre',
      image: publisherLogo,
      time: '10:30 AM',
    },
    {
      variant: 'new_publish',
      author: 'betasoft',
      image: publisherLogo,
      time: '10:30 AM',
    },
    {
      variant: 'trade_success',
      authors: [
        {
          author: 'betasoft',
          image: publisherLogo,
        },
        {
          author: 'omnico-team',
          image: publisherLogoTwo,
        },
      ],
      time: 'Yesterday',
    },
    {
      variant: 'new_publish',
      author: 'betasoft',
      image: publisherLogo,
      time: '10:30 AM',
    },
  ];

  return (
    <div className="absolute inset-0 sm:inset-auto sm:right-0 xl:right-[80px] 2xl:right-[140px] sm:top-0 bg-white dark:bg-[#181818] sm:dark:bg-[#343434] max-w-[690px] w-full h-full sm:max-h-[523px] sm:rounded-[20px] sm:py-[10px] xl:pt-[20px] xl:pb-0 overflow-hidden flex flex-col">
      <div className="p-[15px] sm:px-[24px] 2xl:px-[40px] flex items-center justify-between border-b border-b-[#DCDCDC] dark:border-b-[#4E4E4E]">
        <div className="text-[18px] sm:text-[20px] 2xl:text-[22px] text-dark-300 dark:text-[#EEEEEE] font-poppins font-semibold">
          Notification
        </div>
        <div className="flex sm:gap-[26px] 2xl:gap-[36px]">
          <button className="text-[12px] text-dark-300 dark:text-[#D4D4D4] font-poppins font-normal">
            Mark All Read
          </button>
          <button className="text-[12px] text-dark-300 dark:text-[#D4D4D4] font-poppins font-normal hidden sm:block">
            Clear All
          </button>
        </div>
      </div>
      <div className="scrollbar-hide pt-[17px] px-[12px] pb-[77px] sm:pb-[10px] h-full flex-1 overflow-auto">
        <div className="flex flex-col gap-[14px] xl:gap-[12px]">
          {notifications.map((notification) => (
            <NotificationComponent notification={notification} />
          ))}
        </div>
      </div>
      <div className="fixed z-50 bottom-0 inset-x-0 sm:hidden">
        <button className="flex justify-center bg-brand py-[18px] w-full text-[16px] text-white font-poppins font-medium">
          Clear All
        </button>
      </div>
    </div>
  );
}
