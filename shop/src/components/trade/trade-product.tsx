import Image from '@/components/ui/image';

export interface ProductProps {
  product_image: StaticImageData | string;
  product_name: string;
  publisher: string;
  publisher_logo: StaticImageData | string;
}

interface TradeProductProps {
  product: ProductProps;
  setTradeProduct: (product: ProductProps) => void;
}

interface TradeProductImageProps {
  image: StaticImageData | string;
  alt: string;
}

function TradeProductImage({ image, alt }: TradeProductImageProps) {
  return (
    <div className='relative pb-[66.78%] w-full overflow-hidden'>
      <Image src={image} alt={alt} layout='fill' objectFit='cover' />
    </div>
  )
}

function TradeButton(props: any) {
  return (
    <button {...props} className='px-[14px] py-[7px] min-w-[69px] text-[10px] text-white italic font-medium font-poppins flex justify-center border border-[#00997B] bg-brand dark:bg-transparent rounded-[71.32px]'>
      Trade
    </button>
  )
}

export default function TradeProduct({ product, setTradeProduct }: TradeProductProps) {
  const { product_image, product_name, publisher, publisher_logo } = product;

  return (
    <div>
      <div>
        <TradeProductImage image={product_image} alt={product_name} />
      </div>
      <div className='mt-[18px] flex items-center justify-between'>
        <div className='flex items-center'>
          <div className='relative w-[32px] min-w-[32px] h-[32px] rounded-full overflow-hidden'>
            <Image src={publisher_logo} alt={publisher} layout='fill' objectFit='cover' />
          </div>
          <div className='ml-[8px]'>
            <div className='text-[14px] text-dark-300 dark:text-[#FEFEFE] font-semibold font-poppins truncate-text-line-two'>
              { product_name }
            </div>
            <div className='text-[12px] text-[#767676] dark:text-[#FEFEFE80] font-normal'>
              { publisher }
            </div>
          </div>
        </div>
        <div className='md:px-[14px]'>
          <TradeButton onClick={() => setTradeProduct(product)} />
        </div>
      </div>
    </div>
  )
}