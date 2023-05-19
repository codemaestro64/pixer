import Image from '@/components/ui/image';
import authorProduct from '@/assets/images/authors/authors-product.png';
import authorLogo from '@/assets/images/authors/logo.png';

function PriceButton({ label }: { label: string }) {
  return (
    <button className='py-[7.13px] min-w-[69px] text-[9.98px] text-[#FEFEFE] bg-brand-dark dark:bg-transparent border border-brand-dark italic font-medium font-poppins rounded-[71.32px]'>
      { label }
    </button>
  )
}

export default function AuthorProduct() {
  return (
    <div>
      {/* product image */}
      <div>
        <div className='relative pb-[66.78%]'>
          <div className='absolute inset-0'>
            <Image src={authorProduct} alt='Product' layout='fill' objectFit='cover'  />
          </div>
        </div>
      </div>
      <div className='mt-[18px] flex items-center'>
        {/* info */}
        <div className='flex items-center mr-[28px]'>
          <div className='min-w-[32px] min-h-[32px] relative rounded-full overflow-hidden'>
            <div className='absolute inset-0'>
              <Image src={authorLogo} alt='Shop' layout='fill' objectFit='cover'  />
            </div>
          </div>
          <div className='ml-[8px]'>
            <div className='text-[14px] text-dark-300 dark:text-[#FEFEFE] font-semibold font-poppins truncate-text-line-two'>
              Dashify WordPress Elementor...
            </div>
            <div className='text-[12px] text-[#0D0D0D] dark:text-[#FEFEFE] opacity-80 dark:opacity-50 font-poppins font-normal'>
              Betasoft
            </div>
          </div>
        </div>
        {/* price */}
        <div className='ml-auto pr-[14px]'>
          <PriceButton label='Free' />
        </div>
      </div>
    </div>
  )
}