import Image from '@/components/ui/image';
import quinaryBannerLight from '@/assets/images/shops/quinary/quinary-banner-light.png';
import quinaryBannerDark from '@/assets/images/shops/quinary/quinary-banner-dark.png';
import { useIsDarkMode } from '@/lib/hooks/use-is-dark-mode';

export default function QuinaryBanner() {
  const { isDarkMode } = useIsDarkMode();
  
  return (
    <div className='min-h-[354px] pl-[60px] pb-[70px] flex items-end justify-start rounded-[30px] overflow-hidden relative'>
      <div className='absolute inset-0 overflow-hidden'>
        <Image
          src={!isDarkMode ? quinaryBannerLight : quinaryBannerDark }
          alt='quinary banner'
          layout='fill'
          objectFit='cover'
        />
      </div>
      <div className='text-[48px] text-white leading-[1.31] font-poppins font-normal tracking-[0.065em] relative z-[2] max-w-[576px]'>
        Grab <span className='text-[#4CE2AA] font-bold'>40% off</span> on your first download
      </div>
    </div>
  )
}