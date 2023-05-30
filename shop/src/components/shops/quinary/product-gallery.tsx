import Image from '@/components/ui/image';
import imageOne from '@/assets/images/shops/quinary/quinary-1.png';
import imageTwo from '@/assets/images/shops/quinary/quinary-2.png';
import imageThree from '@/assets/images/shops/quinary/quinary-3.png';
import RatingDownloads from '../rating-downloads';
import { ShoppingBagLineIcon } from '@/components/icons/shopping-bag-line-icon';

interface GalleryItemProps {
  item: {
    image: StaticImageData | string;
    name: string;
    rating: number;
    downloads: string;
    price: number;
  }
  activeItem: boolean;
}

function GalleryBackground({ image }: { image: StaticImageData | string }) {
  return (
    <div className='absolute z-[1] inset-0 overflow-hidden'>
      <Image
        src={image}
        alt='gallery product'
        layout='fill'
        objectFit='cover'
      />
    </div>
  )
}

function GalleryPrice({ price }: { price: number }) {
  return (
    <div className='py-[17px] px-[35px] min-w-[168px] rounded-full text-[24px] text-[#FEFEFE] italic font-poppins font-medium text-center bg-[#212121]'>
      &#36;{ price.toFixed(2) }
    </div>
  )
}

function GalleryItem({ item, activeItem }: GalleryItemProps) {
  const { image, name, rating, downloads, price } = item;
  const boxWidth = activeItem ? 'w-[932.87px]' : 'w-[445.25px]';
  const activeOpacity = activeItem ? '' : 'opacity-0';
  
  return (
    <div className={`relative h-[597.22px] overflow-hidden ${ boxWidth }`}>
      <GalleryBackground image={image} />
      <div className={`absolute z-[2] right-[45px] top-[35px] ${ activeOpacity }`}>
        <GalleryPrice price={price} />
      </div>
      <div className={`pr-[62px] pl-[48px] absolute z-[2] bottom-0 inset-x-0 ${activeOpacity}`}>
        <div className='flex items-end justify-between pb-[48px]'>
          <div className='pb-[18px]'>
            <div className='text-[42px] text-[#FEFEFE] leading-[1.25] font-poppins font-bold max-w-[580px]'>
              { name } <span className='text-[32px] font-normal'>&#40; Printable &#41;</span>
            </div>
            <div className='mt-[28px]'>
              <RatingDownloads
                rating={rating.toString()}
                downloads={downloads}
                large
              />
            </div>
          </div>
          <div>
            <button className='flex items-center justify-center w-[95.49px] h-[95.49px] rounded-full bg-brand'>
              <ShoppingBagLineIcon className='h-[39.32px] w-[39.32px] text-white' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProductGallery() {
  const activeGalleryItem = 0;  
  const gallery = [
    {
      image: imageOne,
      name: 'Deer Illustration - Wall Art',
      rating: 4.8,
      downloads: '2.6k',
      price: 52,
    },
    {
      image: imageTwo,
      name: 'Deer Illustration - Wall Art',
      rating: 4.8,
      downloads: '2.6k',
      price: 52,
    },
    {
      image: imageThree,
      name: 'Deer Illustration - Wall Art',
      rating: 4.8,
      downloads: '2.6k',
      price: 52,
    },
  ]
  
  return (
    <div>
      <div className='px-[56px] flex overflow-auto scrollbar-hide'>
        <div className='flex-1 flex'>
          { gallery.map((item, index) => (
            <GalleryItem
              key={index}
              item={item}
              activeItem={activeGalleryItem === index}
            />
          )) }
        </div>
      </div>
      <div className='px-[56px] mt-[12px]'>
        <div className='w-[250px] h-[10px] bg-[#FFDAB8]'>
          <div className='w-[40px] h-[10px] bg-brand rounded-full'></div>
        </div>
      </div>
    </div>
  )
}