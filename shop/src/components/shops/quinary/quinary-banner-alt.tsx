import Image from '@/components/ui/image';
import quinaryBannerAlt from '@/assets/images/shops/quinary/quinary-banner-alt.png';
import happyGirl from '@/assets/images/shops/quinary/quinary-happy-girl.png';

export default function QuinaryBannerAlt() {
  return (
    <div className='py-[75px] px-[42px] relative rounded-[30px] overflow-hidden bg-brand min-h-[354px]'>
      <div className='absolute inset-0 z-[1] overflow-hidden'>
        <Image
          src={quinaryBannerAlt}
          alt='quinary banner alt'
          layout='fill'
          objectFit='cover'
        />
      </div>
      <div className='absolute bottom-0 right-0 z-[2] w-[352px] h-[327px] overflow-hidden'>
        <Image
          src={happyGirl}
          alt='quinary banner alt'
          layout='fill'
          objectFit='cover'
        />
      </div>
      <div className='relative z-[3] text-[48px] text-white font-bold font-poppins leading-[0.99] max-w-[258px]'>
        Subscribe Now
      </div>
    </div>
  )
}