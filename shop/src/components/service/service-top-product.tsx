import React from 'react';
import Image from '@/components/ui/image';
import TrendingProductImage from '@/assets/images/trending-product.png';
import { BookmarkIcon } from '../icons/bookmark-icon';
import { EllipsisVerticalIcon } from '../icons/ellipsis-vertical-icon';

function TopProductButton({ icon }: { icon: React.ReactElement }) {
  const additionalClass = icon.props?.className || ''
  return (
    <button>
      { React.cloneElement(icon, { className: 'h-[24px] 3xl:h-[32px] w-[24px] 3xl:w-[32px] ' + additionalClass}) }
    </button>
  )
}

export default function ServiceTopProduct({ position, name, publisher }: { position: string, name: string, publisher: string }) {
  return (
    <div className='h-[82px] md:h-[90px] 3xl:h-[100px] px-[10px] w-full bg-[#f3f3f3] dark:bg-dark-200 flex items-center rounded-[10px] font-poppins text-[#3a3a3a] dark:text-[#dedede] 3xl:dark:text-white'>
      {/* id, image and name */}
      <div className='flex items-center w-full'>
        <div className='px-[12.5px] md:px-[22.5px] py-[9px]'>
          <span className='text-[16px] 3xl:text-[23.64px] font-semibold'>{ position }</span>
        </div>
        <div className='mx-[14px] md:mx-[21px]'>
          <div className='w-[48px] md:w-[62px] 3xl:w-[72px] h-[48px] md:h-[62px] 3xl:h-[72px] rounded-[10px] overflow-hidden relative'>
            <Image src={TrendingProductImage} alt={name} layout='fill' objectFit='cover' />
          </div>
        </div>
        <div className='px-[10px] max-w-[173px] md:max-w-[203px] 3xl:max-w-[292px] text-left'>
          <p className='text-[12px] md:text-[14px] 3xl:text-[18px] md:ml-[10px] font-medium md:font-semibold truncate-text-line-two'>{ name }</p>
        </div>
        <div className='hidden md:block px-[10px] md:mx-auto min-w-[169px] text-center'>
          <p className='text-[14px] 3xl:text-[16px] font-poppins font-medium text-[#545454]'>{ publisher }</p>
        </div>
      </div>
      <div className='ml-auto px-[10px] space-x-[18px] 3xl:space-x-[58px] flex items-center'>
        <TopProductButton icon={<BookmarkIcon />} />
        <TopProductButton icon={<EllipsisVerticalIcon className='rotate-90' />} />
      </div>
    </div>
  )
}