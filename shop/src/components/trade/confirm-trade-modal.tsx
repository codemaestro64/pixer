import Image from '@/components/ui/image';
import { ProductProps } from './trade-product';
import { ArrowLeftRightLineIcon } from '../icons/arrow-left-right-line-icon';
import { CloseIcon } from '../icons/close-icon';

interface ConfirmTradeModalProps {
  tradeProduct: ProductProps;
  productToTrade: ProductProps;
  closeModal: () => void;
  confirmTrade: () => void;
}

interface ProductItemProps {
  product: ProductProps;
  closeModal?: () => void;
}

function ProductItem({ product, closeModal }: ProductItemProps) {
  const { product_image, product_name, publisher, publisher_logo } = product;
  
  return (
    <div className='relative'>
      <div className='relative pb-[66.78%] w-full overflow-hidden'>
        <Image src={product_image} alt={product_name} layout='fill' objectFit='cover' />
      </div>
      <div className='mt-[20px] flex items-center'>
        <div className='relative w-[38px] min-w-[38px] h-[38px] rounded-full overflow-hidden'>
          <Image src={publisher_logo} alt={publisher} layout='fill' objectFit='cover' />
        </div>
        <div className='ml-[8px]'>
          <div className='text-[16.56px] text-dark-300 dark:text-[#FEFEFE] font-semibold font-poppins truncate-text-line-two'>
            { product_name }
          </div>
          <div className='text-[14.19px] text-[#767676] dark:text-[#FEFEFE80] font-normal'>
            { publisher }
          </div>
        </div>
      </div>
      { closeModal ? (
        <button
          onClick={closeModal}
          className='absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-[38px] h-[38px] bg-[#9A1C1C] rounded-full flex items-center justify-center'
        >
          <CloseIcon className='w-[18px] h-[18px] text-white' />
        </button>
      ) : null }
    </div>
  )
}

export default function ConfirmTradeModal({
  tradeProduct,
  closeModal,
  confirmTrade,
  productToTrade,
}: ConfirmTradeModalProps) {
  return (
    <div className='px-[20px] lg:px-[60px] 2xl:px-[80px] py-[52px] lg:py-[30px] 2xl:py-[52px] bg-[#FEFEFE] dark:bg-[#292929] overflow-scroll w-full lg:w-auto'>
      <div>
        <div className='text-[22px] xl:text-[25.17px] text-dark-300 dark:text-white italic font-poppins font-medium'>
          Confirm Your Trade Items
        </div>
      </div>
      <div className='mt-[44px] lg:mt-[32px] flex justify-center'>
        <div className='grid gap-[30px] lg:gap-[60px] grid-cols-[repeat(1,minmax(1fr,400px))] lg:grid-cols-[334.72px_42px_334.72px]'>
          <ProductItem product={tradeProduct} closeModal={closeModal} />
          <div className='self-center justify-self-center'>
            <ArrowLeftRightLineIcon className='w-[42px] h-[42px] mx-[70px] text-dark-300 dark:text-white rotate-90 lg:rotate-0' />
          </div>
          <ProductItem product={productToTrade} />
        </div>
      </div>
      <div className='mt-[58px] lg:mt-[42px] flex justify-center'>
        <button
          onClick={confirmTrade}
          className='h-[62px] inline-block w-full max-w-[500px] mx-[20px] bg-brand text-[14px] text-white font-poppins font-medium italic shadow-trade-submit-light dark:shadow-trade-submit-dark'
        >
          Submit Trade Item
        </button>
      </div>
    </div>
  )
}