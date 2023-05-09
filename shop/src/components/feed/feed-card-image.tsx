import React from 'react';
import Image from '@/components/ui/image';
import { SearchIcon } from '../icons/search-icon';
import { DetailsIcon } from '../icons/details-icon';
import { PlayFillIcon } from '../icons/play-fill-icon';

function BackdropButton({ icon }: { icon: React.ReactElement }) {
  return (
    <button className='flex items-center justify-center w-[45.03px] h-[45.03px] border text-[#f5f5f5] hover:text-brand border-current rounded-full mb-[6.6px] hover:translate-y-[-4px] transition-transform duration-200'>
      {React.cloneElement(icon, { className: 'w-[17px] h-[17px]'})}
    </button>
  )
}

export default function FeedCardImage({ cardImage }: { cardImage: StaticImageData}) {
  return (
    <div className='relative pb-[80%] h-full w-full group-hover:shadow-feed-image'>
      {/* layer 1 */}
      <div className='absolute inset-0 w-full h-full z-[3] rounded-[8.65px] group-hover:translate-x-[-9px] group-hover:translate-y-[-9px] transition-transform duration-300 bg-[#f3f3f3] dark:bg-[#292929] overflow-hidden'>
        {/* backdrop */}
        <div className='absolute inset-[-5px] z-[2] bg-[rgba(30,30,30,0.8)] backdrop-blur rounded-[8.65px] opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300'>
          {/* central buttons */}
          <div className='text-white flex items-center justify-center gap-[19.5px] h-full'>
            <div className='flex flex-col items-center'>
              <BackdropButton icon={<SearchIcon />} />
              <div className='text-[8.66px] font-medium italic'>PREVIEW</div>
            </div>
            <div className='flex flex-col items-center'>
              <BackdropButton icon={<DetailsIcon />} />
              <div className='text-[8.66px] font-medium italic'>DETAILS</div>
            </div>
          </div>
          {/* price */}
          <div className='absolute left-[25.78px] bottom-[25.97px]'>
            <div className='px-[17.32px] py-[8.66px] rounded-[85px] font-[12.12px] font-medium italic border border-brand-dark text-[#fefefe]'>$42.00</div>
          </div>
        </div>
        {/* image */}
        <Image src={cardImage} width='100%' height='100%' layout='fill' className='object-cover' />

        {/* play icon */}
        <div className='absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2'>
          <PlayFillIcon className='w-[51px] h-[51px]' />
        </div>
      </div>
      {/* layer 2 */}
      <div className='absolute inset-0 z-[2] group-hover:-translate-x-[4.5px] group-hover:-translate-y-[4.5px] rounded-[8.65px] bg-brand-dark transition-transform duration-300'></div>
      {/* layer 3 */}
      <div className='absolute inset-0 z-[1] rounded-[8.65px] bg-[#05604E]'></div>
    </div>
  )
}