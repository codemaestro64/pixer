import Image from '@/components/ui/image';
import { VerifiedIcon } from '../icons/verified-icon';

export default function Publisher({ logo, name, followers }: { logo: StaticImageData, name: string, followers: number }) {
  return (
    <div className='flex items-center'>
      <div className='h-[32.26px] md:h-[42px] w-[32.26px] md:w-[42px] relative'>
        <Image src={logo} alt='Publisher' layout='fill' objectFit='cover'  />
      </div>
      <div className='ml-[8.45px] md:ml-[11px] gap-[3.86px] 3xl:gap-[3px]'>
        <div className='flex gap-[2.3px] items-center'>
          <span className='text-[12.29px] md:text-[16px] 3xl:text-[24px] text-[#2a2a2a] dark:text-[#d5d5d5] font-poppins font-semibold'>{ name }</span>
          <span>
            <VerifiedIcon className='w-[20.26px] md:w-[26.37px] 3xl:w-[27.05px] h-[20.26px] md:h-[26.37px] 2xl:h-[27.05px]' />
          </span>
        </div>
        <div>
          <span className='text-[10.75px] md:text-[14px] text-[#666] font-medium font-poppins'>{ followers } Followers</span>
        </div>
      </div>
    </div>
  )
}