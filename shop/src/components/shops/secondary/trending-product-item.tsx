import Image from '@/components/ui/image';
import SecondaryButton from '../secondary-button';
import image from '@/assets/images/shops/image-3.png';
import RatingDownloads from '../rating-downloads';

function Description({ desc }: { desc: string }) {
  return (
    <div className='max-h-[166px] text-[22px] text-white leading-tight text-ellipsis font-quicksand font-semibold truncate-text-line-five'>
      { desc }
    </div>
  )
}

function Price({ price }: { price: string }) {
  return (
    <div className='min-w-[160px] py-[15px] px-[22px] text-[19.19px] text-[#3CFF38] font-bold font-poppins overflow-hidden'>
      &#36;&nbsp;{ price }
    </div>
  )
}

function Title({ title }: { title: string }) {
  return (
    <div className='text-[42px] text-white leading-tight font-quicksand'>
      { title }
    </div>
  )
}

export default function TrendingProductItem() {
  return (
    <div className='grid grid-cols-[1fr_654px] gap-[50px]'>
      <div className='flex items-center'>
        <div className='flex-1 relative pb-[71.81%]'>
          <Image
            src={image}
            alt='Trending Product'
            layout='fill'
            objectFit='cover'
          />
        </div>
      </div>
      <div className='space-y-[36px]'>
        <Title title='Learning Web App - responsive landing page design' />
        <div className='flex gap-[36px]'>
          <Price price='45.00' />
          <RatingDownloads rating='4.8' downloads='2.6k' />
        </div>
        <div className='overflow-hidden'>
         <Description desc='Lorem ipsum dolor sit amet consectetur. Malesuada enim maecenas dignissim tellus nulla bibendum sed. Nunc parturient at parturient eget. Laoreet facilisis leo risus nunc ac fermentum purus duis lobortis. Aliquet amet et elementum aliquet dolor tincidunt nisl adipiscing. Tortor sed.' />
        </div>
        <div className='flex gap-[27px] flex-wrap'>
          <SecondaryButton label='Checkout' primary semibold />
          <SecondaryButton label='Add To Cart' />
        </div>
      </div>
    </div>
  )
}