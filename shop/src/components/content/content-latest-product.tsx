import Image from '@/components/ui/image';
import Publisher from './publisher';
import TrendingProductImage from '@/assets/images/trending-product.png';
import publisherLogo from '@/assets/images/publisher-logo.png';

function ProductDateView() {
  return (
    <div className='flex items-center text-[12px] text-[#989898] font-medium font-poppins'>
      <div>3 Day&#180;s Ago</div>
      <div className='h-[3px] w-[3px] rounded-full bg-[#D9D9D9] mx-[14px]'></div>
      <div>View Product</div>
    </div>
  )
}

export default function ContentLatestProduct() {
  return (
    <div className='flex items-center'>
      <div className='mr-[18px]'>
        <div className='min-h-[180px] min-w-[200px] rounded-[10px] overflow-hidden relative'>
          <Image src={TrendingProductImage} alt='Product' layout='fill' objectFit='cover' />
        </div>
      </div>
      <div>
        <div>
          <div className='text-[22px] text-dark dark:text-white font-medium font-poppins'>
            RNB Modern Laravel React Rental System
          </div>
        </div>
        <div className='mt-[14px]'>
          <Publisher name='Imagineco' logo={publisherLogo} followers={20} small />
          <div className='mt-[20.17px]'>
            <ProductDateView />
          </div>
        </div>
      </div>
    </div>
  )
}