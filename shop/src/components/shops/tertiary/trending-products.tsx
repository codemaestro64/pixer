import Image from '@/components/ui/image';
import ViewAll from '../view-all';
import productImageOne from '@/assets/images/shops/image-3.png';
import productImageTwo from '@/assets/images/shops/image-1.png';
import RatingDownloads from '../rating-downloads';
import SecondaryButton from '../secondary-button';

interface TrendingProductProps {
  product_image: StaticImageData | string;
  product_title: string;
  price: number;
  rating: number;
  downloads: string;
}

function TrendingProduct({ product }: { product: TrendingProductProps }) {
  return (
    <div className='space-y-[36px]'>
      <div>
        <div className='relative w-[667px] h-[326px] overflow-hidden'>
          <Image
            src={product.product_image}
            alt={product.product_title}
            layout='fill'
            objectFit='cover'
          />
        </div>
        <div>
          <div className='text-[42px] text-[#272727] leading-[1.25] font-quicksand font-semibold'>
            { product.product_title }
          </div>
        </div>
      </div>
      <div className='flex gap-[36px]'>
        <div className='px-[22.15px] py-[9.5px] min-w-[160px]'>
          <div className='text-[19.19px] text-[#010101] font-poppins font-bold'>
            &#36;&nbsp;{ product.price.toFixed(2) }
          </div>
        </div>
        <div>
          <RatingDownloads
            rating={product.rating.toString()}
            downloads={product.downloads}
            dark
          />
        </div>
      </div>
      <div>
        <div className='text-[22px] leading-[1.25] text-black font-semibold font-quicksand truncate-text-line-five max-w-[645px] min-h-[166px]'>
          Lorem ipsum dolor sit amet consectetur. Malesuada enim maecenas dignissim tellus nulla bibendum sed. Nunc parturient at parturient eget. Laoreet facilisis leo risus nunc ac fermentum purus duis lobortis. Aliquet amet et elementum aliquet dolor tincidunt nisl adipiscing. Tortor sed.
        </div>
      </div>
      <div className='flex gap-[27px]'>
        <SecondaryButton label='Checkout' primary dark />
        <SecondaryButton label='Add To Cart' dark />
      </div>
    </div>
  )
}

export default function TertiaryTrendingProducts() {
  const trending_products: TrendingProductProps[] = [
    {
      product_image: productImageOne,
      product_title: 'Learning Web App - responsive landing page design',
      price: 45,
      rating: 4.8,
      downloads: '2.6k'
    },
    {
      product_image: productImageTwo,
      product_title: 'Learning Web App - responsive landing page design',
      price: 45,
      rating: 4.8,
      downloads: '2.6k'
    },
    {
      product_image: productImageOne,
      product_title: 'Learning Web App - responsive landing page design',
      price: 45,
      rating: 4.8,
      downloads: '2.6k'
    },
    {
      product_image: productImageTwo,
      product_title: 'Learning Web App - responsive landing page design',
      price: 45,
      rating: 4.8,
      downloads: '2.6k'
    },
  ]
  
  return (
    <div>
      <div className='mt-[46px] px-[114px]'>
        <div className='py-[11px] flex items-center justify-between'>
          <div className='text-[31px] leading-[1.04] text-[#010101] font-poppins font-bold'>
            Trending Product
          </div>
          <div>
            <ViewAll dark />
          </div>
        </div>
      </div>
      <div className='mt-[55px] px-[114px] flex gap-[30px] overflow-auto scrollbar-hide'>
        {trending_products.map((product, index) => (
          <TrendingProduct key={index} product={product} />
        ))}
      </div>
    </div>
  )
}