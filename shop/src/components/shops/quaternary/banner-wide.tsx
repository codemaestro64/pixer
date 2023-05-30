import Image from '@/components/ui/image';
import happyGuyImage from '@/assets/images/shops/happy-guy.png';
import bannerWideBg from '@/assets/images/shops/quaternary/banner-wide-bg.png';

function BannerButton() {
  return (
    <button className='text-[22px] font-bold font-poppins py-[20px] px-[30px] bg-[#010101] text-white text-center inline-block min-w-[317px]'>
      Explore Now
    </button>
  )
}

export default function BannerWide() {
  return (
    <div className='pt-[66px] pb-[60px] pl-[82px] relative rounded-[20px]'>
      <div className='relative z-[3]'>
        <div className='max-w-[575px]'>
          <div className='text-[48px] leading-[1.3] font-normal font-poppins text-black'>
            Grab <span className='font-bold'>40% off</span> on your first download
          </div>
        </div>
        <div className='mt-[28px]'>
          <BannerButton />
        </div>
      </div>
      <Image
        src={bannerWideBg}
        alt='Banner'
        layout='fill'
        objectFit='cover'
        className='z-[1]'
      />
      <div className='absolute z-[2] bottom-0 right-[132px] w-[579px] h-[536px]'>
        <Image 
          src={happyGuyImage}
          alt='Happy guy'
          layout='fill'
          objectFit='contain'
        />
      </div>
    </div>
  )
}