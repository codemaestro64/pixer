import Image from 'next/image';
import heroImage from '@/assets/images/hero-image.svg';
import { SearchIcon } from '@/components/icons/search-icon';

export default function HeroSection() {
  return (
    <div className='pb-4 sm:pb-5 md:pb-6 lg:pb-7 3xl:pb-8 pt-5 md:pt-6 px-4 sm:px-5 md:px-6 lg:px-7 3xl:px-8 border-b border-light-400 dark:border-dark-300 dark:bg-dark-100'>
      <div className='relative flex flex-col rounded-[10px] bg-hero-mobile sm:bg-hero-desktop bg-cover overflow-hidden h-[232px] lg:h-[280px] pt-[44px] pb-[24px] px-[24px] md:px-[38px] lg:px-[47px] 2xl:px-[104px]'>
        <div className='max-w-[245px] lg:max-w-[520px] pl-[4px]'>
          <span className='text-white font-poppins text-18px lg:text-[30.61px] lg:leading-[46px]'>
            <span className='font-normal'>Get</span> <span className='text-22px lg:text-[39.07px] font-extrabold'>Hassle Free Amazing Templates</span> <span className='font-normal'>For Your Need</span>
          </span>
        </div>
  
        <div className='mt-[34px] lg:mt-[24px]'>
          <div className='relative inline-block'>
            <input type="text" placeholder='Search theme, file, templates...' className='h-[37px] lg:h-[57px] w-[66px] lg:w-[487px] text-white font-poppins lg:px-[30px] lg:py-[15px] rounded-[77px] border border-white bg-hero_input placeholder:text-transparent lg:placeholder:text-[rgba(255,255,255,0.5)] lg:placeholder:text-18px placeholder:font-poppins' />

            <div className='absolute top-1/2 left-1/2 lg:left-auto lg:right-[20px] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center'>
              <SearchIcon className='text-white h-[18.5px] lg:h-[20px] w-[18.5px] lg:w-[20px]' fill='#fff' />
            </div>
          </div>
        </div>
        <div className='absolute hidden xs:block bottom-[8px] lg:bottom-[-20px] right-[-10px] md:right-[40px] lg:right-8 2xl:right-24 3xl:right-64 h-[192px] lg:h-[306px] w-[200px] lg:w-[294px]'>
          <Image src={heroImage} width={294} height={306} />
        </div>
      </div>
    </div>
  )
}