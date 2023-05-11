import { Product } from '@/types';
import Image from '@/components/ui/image';
import { EllipsisVerticalIcon } from '../icons/ellipsis-vertical-icon';
import { VerifiedIcon } from '../icons/verified-icon';

interface Recommended {
  product: Product
}

function Recommended({ product }: Recommended ) {
  const { name, image, shop, created_at } = product;

  const createdDate = new Date(created_at);
	const currentDate = new Date();
	const difference = currentDate.getTime() - createdDate.getTime();
	const daysAgo = Math.floor(difference / (1000 * 60 * 60 * 24));

  return (
    <div className='flex pr-[8px]'>
      {/* product image */}
      <div className='min-h-[180px] min-w-[200px] mr-[18px] rounded-[10px] overflow-hidden relative'>
        <Image src={image.original} alt={shop.name} layout='fill' objectFit='cover' />
      </div>
      <div className='flex flex-col justify-center'>
        {/* product name */}
        <div>
          <p className='text-[22px] text-dark-300 dark:text-white font-medium font-poppins'>{name}</p>
        </div>
        {/* shop */}
        <div className='flex items-center mt-[14px]'>
          <Image src={shop.logo.original} alt={shop.name} width={25.57} height={25.57} className='rounded-full overflow-hidden' />
          <div className='ml-[7px] flex flex-col justify-center'>
            <div className='mb-[2px] flex items-center'>
              <span className='text-[14px] text-[#434343] dark:text-[#FDFDFD] font-poppins font-semibold'>{shop.name}</span>
              <VerifiedIcon className='h-[16.05px] w-[16.05px] ml-[2px]' />
            </div>
            <span className='text-[8.52px] text-[#666] font-poppins font-medium'>20 Followers</span>
          </div>
        </div>
        {/* days ago & view product */}
        <div className='mt-[20px] text-[12px] text-dark-850 poppins font-medium flex items-center'>
          <span>
            {daysAgo} Day&#180;s Ago
          </span>
          <div className='h-[3px] w-[3px] mx-[14px] bg-[#D9D9D9] rounded-full'></div>
          <span>View Product</span>
        </div>
      </div>
    </div>
  )
}

export default function ProductRecommended({ product }: Recommended) {
  return (
    <div className='pb-[26px]'>
      <div className='flex px-[20px] py-[17.5px]'>
        <div>
          <p className='text-[23.64px] text-[#3a3a3a] dark:text-white font-semibold font-poppins'>Recommended</p>
        </div>
        <div className='ml-auto'>
          <button>
            <EllipsisVerticalIcon className='h-[42px] w-[42px] text-[#3a3a3a] dark:text-white rotate-90' />
          </button>
        </div>
      </div>
      <div className='space-y-[26px]'>
        {/* item */}
        <Recommended product={product} />
        <Recommended product={product} />
        <Recommended product={product} />
      </div>
    </div>
  )
}