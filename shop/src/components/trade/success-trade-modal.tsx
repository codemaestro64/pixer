import Image from '@/components/ui/image';
import { ProductProps } from './trade-product';
import successTradeImage from '@/assets/images/trade/success-trade.png';

interface SuccessTradeModalProps {
  tradeProduct: ProductProps | null;
  productToTrade: ProductProps;
  backToHome: () => void;
}

function Button({ label, onClick, primary }: {
  label: string;
  primary?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-[16px] font-poppins font-medium block w-full max-w-[594px] py-[19px] ${
        primary ?
          'bg-[radial-gradient(100%_63.64%_at_0%_49.44%,_#00997B_0%,_#24B47E_100%)] text-[#FEFEFE]' :
          'text-dark-300 dark:text-[#FEFEFE] bg-transparent border border-[#DEDEDE] dark:border-[#606060]'
      }`}
    >
      { label }
    </button>
  )
}

export default function SuccessTradeModal({
  productToTrade,
  tradeProduct,
  backToHome
}: SuccessTradeModalProps) {
  return (
    <div className='pt-[32px] px-[30px] lg:px-[110px] pb-[56px] bg-[#FEFEFE] dark:bg-[#292929] w-full max-w-[832px] flex flex-col justify-center overflow-auto'>
      <div className='w-[240px] h-[240px] mx-auto relative'>
        <Image src={successTradeImage} alt='Success Trade' layout='fill' objectFit='cover' />
        <div className='absolute top-1/2 left-[70px] -translate-y-1/2 w-[61.32px] h-[61.32px] rounded-full overflow-hidden z-[2]'>
          <Image
            src={tradeProduct?.publisher_logo || ''}
            alt={tradeProduct?.publisher}
            layout='fill'
            objectFit='cover'
          />
        </div>
        <div className='absolute top-1/2 right-[70px] -translate-y-1/2 w-[61.32px] h-[61.32px] rounded-full overflow-hidden z-[1]'>
          <Image
            src={productToTrade?.publisher_logo || ''}
            alt={productToTrade?.publisher}
            layout='fill'
            objectFit='cover'
          />
        </div>
      </div>
      <div>
        <div className='text-[42px] text-dark-300 dark:text-white font-poppins font-semibold text-center'>
          Successfully Traded
        </div>
        <div className='text-[14px] text-[#8D8D8D] dark:text-[#DDDDDD] font-poppins font-normal text-center max-w-[344px] mx-auto mt-[12px]'>
          Your traded item is successfully added to your collection items 
        </div>
      </div>
      <div className='mt-[36px] space-y-[18px]'>
        <Button label='Go To Collection Items' primary />
        <Button label='Back to home' onClick={backToHome} />
      </div>
    </div>
  )
}