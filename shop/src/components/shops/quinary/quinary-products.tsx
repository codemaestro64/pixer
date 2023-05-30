import Image from '@/components/ui/image';
import imageOne from '@/assets/images/shops/image-3.png';
import imageTwo from '@/assets/images/shops/image-2.png';
import authorLogo from '@/assets/images/publisher-logo.png';
import ProductInfo from '../product-info';
import { useIsDarkMode } from '@/lib/hooks/use-is-dark-mode';
import ShoppingButton from '../shopping-button';

interface ProductBannerProps {
  price: number;
  image: string | StaticImageData;
}

function ProductBanner({ price, image }: ProductBannerProps) {
  return (
    <div className='relative pb-[53.52%]'>
      <Image src={image} alt='Product' layout='fill' objectFit='cover' />
      <div className='absolute left-[18px] bottom-[26px] min-w-[81.51px] py-[8px] px-[17px] rounded-full text-[11.8px] text-[#FEFEFE] italic font-poppins font-medium bg-[#044438CC] border border-[#00997B] flex justify-center'>
        { !price ? 'Free' : '$ ' + price.toFixed(2) }
      </div>
    </div>
  )
}

export default function QuinaryProducts() {
  const { isDarkMode } = useIsDarkMode();
  const products = [
    {
      image: imageOne,
      price: 0,
      product_name: 'Dashify WordPress Elementor ...',
      author_logo: authorLogo,
      author_name: 'Betasoft',
    },
    {
      image: imageTwo,
      price: 45,
      product_name: 'Dashify WordPress Elementor ...',
      author_logo: authorLogo,
      author_name: 'Betasoft',
    },
    {
      image: imageOne,
      price: 45,
      product_name: 'Dashify WordPress Elementor ...',
      author_logo: authorLogo,
      author_name: 'Betasoft',
    },
    {
      image: imageTwo,
      price: 0,
      product_name: 'Dashify WordPress Elementor ...',
      author_logo: authorLogo,
      author_name: 'Betasoft',
    },
    {
      image: imageOne,
      price: 45,
      product_name: 'Dashify WordPress Elementor ...',
      author_logo: authorLogo,
      author_name: 'Betasoft',
    },
    {
      image: imageTwo,
      price: 45,
      product_name: 'Dashify WordPress Elementor ...',
      author_logo: authorLogo,
      author_name: 'Betasoft',
    },
  ]
  
  return (
    <div className='px-[54px] grid grid-cols-3 gap-x-[52px] gap-y-[30px]'>
      { products.map(({ author_logo, author_name, image, price, product_name }, index) => (
        <div key={index}>
          <ProductBanner image={image} price={price} />
          <div className='mt-[18px] py-[12px] pr-[8px] flex items-center justify-between'>
            <ProductInfo
              author={author_name}
              logo={author_logo}
              name={product_name}
              dark={!isDarkMode}
              small
            />
            <div>
              <ShoppingButton alt />
            </div>
          </div>
        </div>
      )) }
    </div>
  )
}