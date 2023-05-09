import Image from '@/components/ui/image';
import { ChevronBottom } from '../icons/chevron-bottom';
import { PlayFillIcon } from '../icons/play-fill-icon';
import FeedImage1 from '@/assets/images/feed/feed-image-1.png';
import FeedImage2 from '@/assets/images/feed/feed-image-2.png';
import FeedVideo1 from '@/assets/images/feed/feed-video-1.png';
import FeedMoreImage from '@/assets/images/feed/feed-more.png';
import FeedFixedBanner from '@/assets/images/feed/feed-fixed-banner.png';
import { useState } from 'react';


function FeedFixedSectionTitle({ label }: { label: string }) {
  return (
    <div className='flex text-dark-300 dark:text-white'>
      <span className='text-[17px] italic font-medium font-poppins'>{ label }</span>
      <span className='ml-auto'>
        <ChevronBottom className='w-[24px] h-[24px]' />
      </span>
    </div>
  )
}

function ImageBox({ image, alt }: { alt: string, image: StaticImageData }) {
  return (
    <div className='h-[108px] w-[213px] relative'>
      <Image src={image} alt={alt} width='100%' height='100%' layout='fill' />
    </div>
  )
}

function TrendingProduct({ productName, productTeam, daysSinceRelease }: { productName: string, productTeam: string, daysSinceRelease: string }) {
  return (
    <div className='flex items-center h-[77px] px-[14px] pt-[16px] cursor-pointer'>
      <div className='font-poppins font-medium flex flex-col'>
        <span className='text-[16px] dark:text-white'>{productName}</span>
        <span className='text-[14px] dark:text-dark-700'>{productTeam}</span>
      </div>
      <div className='ml-auto'>
        <span className='italic text-[12px] dark:text-dark-700'>{daysSinceRelease}</span>
      </div>
    </div>
  )
}

export default function FeedFixedSection() {
  const [unlockOverflow, setUnlockOverflow] = useState(false);
  
  return (
    <div className='pr-[46px] h-full flex flex-col pb-[12px]'>
      {/* Top Product */}
      <div>
        <div>
          <div className='pl-[12px] pr-[32px] pt-[24px] pb-[26px]'>
            <FeedFixedSectionTitle label='Top Product' />
          </div>
        </div>
        <div className='grid grid-cols-2 gap-[10px]'>
          <ImageBox alt='Product 1' image={FeedImage1} />
          <div className='relative'>
            <ImageBox alt='Product Video' image={FeedVideo1} />
            <div className='absolute left-[10px] bottom-[10px]'>
              <PlayFillIcon className='h-[24px] w-[24px]' />
            </div>
          </div>
          <ImageBox alt='Product 2' image={FeedImage2} />
          <div className='relative'>
            <ImageBox alt='More products' image={FeedMoreImage} />
            <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
              <span className='font-poppins italic font-medium text-[16.11px] text-[#fff]'>10+ More</span>
            </div>
          </div>
        </div>
      </div>
      {/* Banner */}
      <div className='mt-[12px]'>
        <div className='relative w-[436px] h-[250px]'>
          <Image src={FeedFixedBanner} alt='Feed Banner' width='100%' height='100%' layout='fill' />
          <div className='absolute left-[31px] bottom-[46px]'>
            <button className='flex items-center justify-center h-[47px] w-[156px] font-poppins text-[16px] font-medium rounded-[100px] text-white border border-white cursor-pointer'>Apply Now</button>
          </div>
        </div> 
      </div>
      {/* Today Trending */}
      <div className='flex-1 bg-light-200 dark:bg-[#242424] rounded-[10px] mt-[21px] overflow-hidden'>
        <div className='relative h-full flex flex-col pb-[34px]'>
          <div className='pt-[25px] pr-[34px] pl-[20px] pb-[22px] bg-light-200 dark:bg-[#242424]'>
            <FeedFixedSectionTitle label='Today Trending' />
          </div>
          <div className={`flex-1 ${unlockOverflow ? 'overflow-x-hidden' : 'overflow-hidden'}`}>
            <div className='pb-[50px]'>
              <TrendingProduct productName='ChawkBazar Laravel Flutter Mobile App' productTeam='Omnico Team' daysSinceRelease='2 days' />
              <TrendingProduct productName='ChawkBazar Laravel Flutter Mobile App' productTeam='Omnico Team' daysSinceRelease='2 days' />
              <TrendingProduct productName='ChawkBazar Laravel Flutter Mobile App' productTeam='Omnico Team' daysSinceRelease='2 days' />
              <TrendingProduct productName='ChawkBazar Laravel Flutter Mobile App' productTeam='Omnico Team' daysSinceRelease='2 days' />
              <TrendingProduct productName='ChawkBazar Laravel Flutter Mobile App' productTeam='Omnico Team' daysSinceRelease='2 days' />
              <TrendingProduct productName='ChawkBazar Laravel Flutter Mobile App' productTeam='Omnico Team' daysSinceRelease='2 days' />
              <TrendingProduct productName='ChawkBazar Laravel Flutter Mobile App' productTeam='Omnico Team' daysSinceRelease='2 days' />
            </div>
          </div>
          <div className='absolute bottom-[21px] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2]'>
            { !unlockOverflow ? (
              <button className='font-poppins text-[17px] font-medium italic dark:text-[#24ffad] text-brand' onClick={() => setUnlockOverflow(true)}>View All</button>
            ) : null }
          </div>
          <div className='absolute bottom-0 left-0 right-0 h-[114px] z-[1]'>
            <div className='hidden dark:block'>
              <svg width="436" height="112" viewBox="0 0 436 112" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="436" height="114" fill="url(#paint0_linear_2_84)"/>
                <defs>
                  <linearGradient id="paint0_linear_2_84" x1="218" y1="0" x2="218" y2="114" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#242424" stop-opacity="0"/>
                  <stop offset="0.651731" stopColor="#242424"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className='dark:hidden'>
              <svg width="436" height="123" viewBox="0 0 436 123" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="436" height="125" fill="url(#paint0_linear_5_3106)"/>
                <defs>
                  <linearGradient id="paint0_linear_5_3106" x1="218" y1="0" x2="218" y2="125" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F8F8F8" stopOpacity="0"/>
                  <stop offset="0.807292" stopColor="#F8F8F8"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}