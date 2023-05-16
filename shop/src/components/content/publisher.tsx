import Image from '@/components/ui/image';
import { VerifiedIcon } from '../icons/verified-icon';

export default function Publisher({ logo, name, followers, small }: { logo: StaticImageData, name: string, followers: number, small?: boolean }) {
  return (
    <div className='flex items-center'>
      <div className={small ? 'mr-[6.7px]' : 'mr-[8.45px] md:mr-[11px]'}>
        <div className={`relative rounded-full overflow-hidden ${
          small ? 'h-[25.57px] w-[25.57px]' : 'h-[32.26px] md:h-[42px] w-[32.26px] md:w-[42px]'
        }`}>
          <Image src={logo} alt={`Publisher ${ name }`} layout='fill' objectFit='cover'  />
        </div>
      </div>
      <div>
        <div className='flex items-center'>
          <div className={`font-poppins font-semibold ${
            small ? 'text-[14px] text-[#434343] dark:text-[#fdfdfd]' : 'text-[12.29px] md:text-[16px] 3xl:text-[24px] text-[#2a2a2a] dark:text-[#d5d5d5]'
          }`}>
            { name }
          </div>
          <VerifiedIcon className={small ? 'w-[16.74px] h-[16.74px] ml-[1.83px] -mb-[2px]' : 'w-[20.26px] md:w-[26.37px] 3xl:w-[27.05px] h-[20.26px] md:h-[26.37px] 2xl:h-[27.05px] ml-[2.3px]'} />
        </div>
        <div className={small ? 'mt-[1.83px]' : 'mt-[3px]'}>
          <div className={`text-[#666] font-medium font-poppins ${
            small ? 'text-[8.52px]' : 'text-[10.75px] md:text-[14px]'
          }`}>
            { followers } Followers
          </div>
        </div>
      </div>
    </div>
  )
}