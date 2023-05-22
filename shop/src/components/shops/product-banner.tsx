import Image from '@/components/ui/image';

interface ProductBannerProps {
  price: number;
  image: StaticImageData;
  wide?: boolean;
}

export default function ProductBanner({ price, image, wide }: ProductBannerProps) {
  return (
    <div className={`relative ${
      wide ? 'pb-[53.52%]' : 'pb-[95.03%]'
    }`}>
      <Image src={image} alt='Product' layout='fill' objectFit='cover' />
      <div className='absolute left-[28px] bottom-[40px] min-w-[121.59px] py-[13px] px-[25px] rounded-[125.68px] text-[17.6px] text-[#010101] italic font-poppins font-medium bg-[#BFFF07] border border-brand flex justify-center'>
        { !price ? 'Free' : '$ ' + price.toFixed(2) }
      </div>
    </div>
  )
}