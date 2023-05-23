import { ArrowLeftLineIcon } from '@/components/icons/arrow-left-line-icon';
import TrendingProductItem from './trending-product-item';

function TrendingSubMenuItem({ active }: { active?: boolean }) {
  return (
    <button className={`flex items-center justify-center border bg-transparent w-[10px] h-[10px] rounded-full ${ active ? 'border-white' : 'border-transparent' }`}>
      <div className={`w-[6px] h-[6px] rounded-full ${ active ? 'bg-white' : 'bg-[#EAEAEA]' }`}></div>
    </button>
  )
}

function TrendingButton({ rotate }: { rotate?: boolean }) {
  return (
    <button className={`${ rotate ? 'rotate-180' : '' }`}>
      <ArrowLeftLineIcon className='text-white w-[42px] h-[42px]' />
    </button>
  )
}

export default function TrendingProducts() {
  return (
    <div className='flex items-center'>
      {/* control */}
      <div className='max-w-[153px] mr-[27px]'>
        <div className='text-[31.34px] text-white leading-[1.04] font-bold'>
          Trending Product
        </div>
        <div className='mt-[22px] pl-[12px] space-x-[15px]'>
          <TrendingButton />
          <TrendingButton rotate />
        </div>
      </div>
      {/* product */}
      <div className='flex-1'>
        <div>
          <TrendingProductItem />
        </div>
        <div className='flex items-center space-x-[1px] mt-[12px]'>
          <TrendingSubMenuItem active />
          <TrendingSubMenuItem />
          <TrendingSubMenuItem />
          <TrendingSubMenuItem />
          <TrendingSubMenuItem />
        </div>
      </div>
    </div>
  )
}