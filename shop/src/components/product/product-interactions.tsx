import React from 'react';
import { BookmarkIcon } from "@/components/icons/bookmark-icon";
import { LinkIcon } from "@/components/icons/link-icon";
import { NotificationIcon } from "@/components/icons/notification-icon";

interface Price {
  salePrice: number;
}

function BuyButton({ salePrice }: Price) {
  return (
    <button className='text-[13.65px] xl:text-[18px] w-[182.69px] xl:w-[241px] h-[47px] xl:h-[62px] font-poppins text-white flex items-center justify-center bg-brand rounded-[75.8px]'>
      <span>{ salePrice ? `$${salePrice} Buy` : 'Free'}</span>
    </button>
  )
}

function InteractionButton({ icon }: { icon: React.ReactElement }) {
  return (
    <button className='text-[#343434] dark:text-white xl:text-white w-[47px] h-[47px] xl:w-[62px] xl:h-[62px] rounded-full border border-[#d4d4d444] flex items-center justify-center'>
      { React.cloneElement(icon, { className: 'h-[18.19px] xl:h-[24px] w-[18.19px] xl:w-[25px]' }) }
    </button>
  )
}

export default function ProductInteractions({ salePrice }: Price) {
  return (
    <div className='col-span-2 xl:col-span-1 ml-[19.67px] xl:ml-[74px] mr-[18.91px] mt-[28px] flex'>
      <div>
        <BuyButton salePrice={salePrice} />
      </div>
      <div className='flex gap-[18.19px] xl:gap-[24px] items-center ml-auto xl:ml-[25px]'>
        <InteractionButton icon={<BookmarkIcon />} />
        <InteractionButton icon={<LinkIcon />} />
        <InteractionButton icon={<NotificationIcon />} />
      </div>
    </div>
  )
}