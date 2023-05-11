import Image from '@/components/ui/image';
import { VerifiedIcon } from '@/components/icons/verified-icon';

interface ProductBanner {
  name: string;
  shopName: string;
  shopLogo: string;
}

export default function ProductBanner({ name, shopName, shopLogo }: ProductBanner) {
  return (
    <div className='xl:flex xl:pl-[74px]'>
      <div className='pl-[26px] xl:pl-[0]'>
        <div className='w-[65px] xl:w-[124px] h-[65px] xl:h-[124px] relative rounded-full overflow-hidden'>
          <Image src={shopLogo} alt={shopName} layout='fill' />
        </div>
      </div>
      <div>
        <div className='pl-[19px] mt-[8px] xl:mt-0'>
          <p className='text-[16.93px] xl:text-[32px] max-w-[260px] xl:max-w-[516px] text-dark-300 dark:text-[#eee] xl:text-white font-poppins font-semibold'>{name}</p>
        </div>
        <div className='mt-[14px] xl:mt-[8px] pl-[19px]'>
          <div className='flex items-center'>
            <Image src={shopLogo} width={20.67} height={20.67} alt={shopName} className='rounded-full overflow-hidden' />
            <span className='text-[17.88px] xl:text-[20.77px] ml-[7px] xl:ml-[8px] text-[#4eeeb2] font-poppins font-semibold'>{shopName}</span>
            <VerifiedIcon className='w-[20.49px] h-[20.49px] xl:w-[23.79px] xl:h-[23.79px] ml-[2px]' />
          </div>
        </div>
      </div>
    </div>
  )
}