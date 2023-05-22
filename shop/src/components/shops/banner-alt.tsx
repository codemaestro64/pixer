import Image from '@/components/ui/image';
import bannerAltImageYellow from '@/assets/images/shops/banner-alt-yellow.png';
import bannerAltImageGreen from '@/assets/images/shops/banner-alt-green.png';
import pointingGirlImage from '@/assets/images/shops/pointing-girl.png';

interface BannerAltProps {
  greenBanner?: boolean;
  textDark?: boolean;
}

function BannerAltButton({ textDark }: BannerAltProps) {
  return (
    <button className={`text-[22px] font-poppins font-bold text-white py-[20px] px-[30px] min-w-[230px] ${
      textDark ? 'bg-[#0E0725]' : 'bg-[#7B5BD7]'
    }`}>
      Follow Us
    </button>
  )
}

export default function BannerAlt({ textDark, greenBanner }: BannerAltProps) {
  return (
    <div className='pt-[76px] px-[38px] pb-[51.2px] relative rounded-[20px] overflow-hidden'>
      <div className='relative z-[3]'>
        <div className='max-w-[360px] ml-auto'>
          <div className={`text-[32px] font-poppins font-bold text-right tracking-[6.5%] ${
            textDark ? 'text-[#010101]' : 'text-white'
          }`}>
            Get daily updates and offers directly to your inbox
          </div>
        </div>
        <div className='mt-[28px] text-right'>
          <BannerAltButton textDark={textDark} />
        </div>
      </div>
      <Image
        src={greenBanner ? bannerAltImageGreen : bannerAltImageYellow }
        alt='Banner Alt'
        layout='fill'
        objectFit='cover'
        className='z-[1]'
      />
      <div className='absolute z-[2] bottom-0 left-[-50px] w-[271px] h-[346px]'>
        <Image 
          src={pointingGirlImage}
          alt='Happy guy'
          layout='fill'
          objectFit='contain'
        />
      </div>
    </div>
  )
}