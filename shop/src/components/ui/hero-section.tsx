import Image from 'next/image';
import heroImage from '@/assets/images/hero-image.svg';
import searchIcon from '@/assets/images/search.svg';

export default function HeroSection() {
  return (
    <div className='pb-4 sm:pb-5 md:pb-6 lg:pb-7 3xl:pb-8 pt-5 md:pt-6 px-4 sm:px-5 md:px-6 lg:px-7 3xl:px-8 border-b border-light-400 dark:border-dark-300 dark:bg-dark-100'>
      <div className='relative flex flex-col rounded-[10px] bg-hero-mobile sm:bg-hero-desktop bg-cover overflow-hidden h-[232px] lg:h-[280px] pt-[44px] pb-[24px] px-[24px] md:px-[38px] lg:px-[47px] 2xl:px-[104px]'>
        <div className='text-white font-normal font-body text-18px lg:text-30px max-w-[245px] lg:max-w-[500px] lg:leading-[46px]'>
          Get <span className='text-22px lg:text-40px font-extrabold'>Hassle Free Amazing Templates</span> For Your Need
        </div>

        <div className='mt-8 lg:mt-6'>
          <div className='relative inline-block'>
            <input type="text" placeholder='Search theme, file, templates...' className='h-[37px] lg:h-[57px] w-[66px] lg:w-[487px] text-white font-body lg:px-[30px] lg:py-[15px] rounded-[77px] border border-white bg-hero_input placeholder:text-transparent lg:placeholder:text-slate-400 lg:placeholder:text-18px' />

            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center lg:hidden'>
              <Image src={searchIcon} width={15.66} height={15.66} />
            </div>
          </div>
        </div>
        <div className='absolute hidden xs:block bottom-[8px] lg:bottom-[-20px] right-[-12px] md:right-[40px] lg:right-8 2xl:right-24 3xl:right-64 h-[192px] lg:h-auto w-[200px] lg:w-auto'>
          <Image src={heroImage} width={294} height={306} />
        </div>
      </div>
    </div>
  )
}