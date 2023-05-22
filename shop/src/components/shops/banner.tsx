import Image from '@/components/ui/image';
import bannerImageBlack from '@/assets/images/shops/banner-black.png';
import bannerImageYellow from '@/assets/images/shops/banner-yellow.png';
import happyGuyImage from '@/assets/images/shops/happy-guy.png';

interface BannerProps {
  green?: boolean;
  yellow?: boolean;
}

function BannerButton({ green, yellow }: BannerProps) {
  return (
    <button className={`text-[22px] font-bold font-poppins py-[20px] px-[70.5px] ${
      green ? 'text-black bg-[#3CFF38]' : yellow ? 'bg-[#0E0725] text-white' : 'text-white bg-[#7B5BD7]'
    }`}>
      Explore Now
    </button>
  )
}

export default function Banner({ green, yellow }: BannerProps) {
  return (
    <div className='pt-[72px] pb-[65px] pl-[74px] relative rounded-[20px] overflow-hidden'>
      <div className='relative z-[3]'>
        <div className='max-w-[540px]'>
          <div className={`text-[44.19px] font-normal font-poppins ${
            yellow ? 'text-[#0E0725]' : 'text-white'
          }`}>
            Grab <span className={`font-bold ${
              green ? 'text-[#3CFF38]' : ''
            }`}>40% off</span> on your first download
          </div>
        </div>
        <div className='mt-[28px]'>
          <BannerButton { ...{ green, yellow } } />
        </div>
      </div>
      <Image
        src={yellow ? bannerImageYellow : bannerImageBlack}
        alt='Banner'
        layout='fill'
        objectFit='cover'
        className='z-[1]'
      />
      <div className='absolute z-[2] top-[10px] right-[-92px] w-[579px] h-[536px]'>
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