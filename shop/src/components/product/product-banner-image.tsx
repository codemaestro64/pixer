import Image from '@/components/ui/image';
import { useIsDarkMode } from '@/lib/hooks/use-is-dark-mode';
import coverImageMobile from '@/assets/images/product/product-cover-mobile.png';
import coverImageDesktopLight from '@/assets/images/product/product-cover-desktop-light.png';

interface ProductBannerImageProps {
  bannerImage: string;
  alt: string;
}

export default function ProductBannerImage({ bannerImage, alt }: ProductBannerImageProps) {
  const { isDarkMode } = useIsDarkMode();

  return (
    <div className='absolute top-0 left-0 right-0 h-[151px] xl:h-[400px] 2xl:h-[583px] w-full rounded-[3.25px] xl:rounded-[10px] overflow-hidden'>
      <Image src={bannerImage} alt={alt} layout='fill' objectFit='cover' className='z-[1]' />
      <div className='absolute top-0 left-0 right-0 bottom-[-4px]'>
        <Image src={coverImageMobile} alt='Cover' layout='fill' objectFit='cover' className={`z-[2] absolute inset-[-2px] ${ !isDarkMode ? 'xl:hidden' : ''}`} />
        { !isDarkMode ? (
          <Image src={coverImageDesktopLight} alt='Cover' layout='fill' objectFit='cover' className='z-[2] absolute inset-[-2px] hidden xl:block' />
        ) : null } 
      </div>
    </div>
  )
}