import Image from '@/components/ui/image';
import background from '@/assets/images/shops/quaternary/third-section-bg.png';
import BannerWide from './banner-wide';
import AllProduct from '../all-product';

import publisherLogo from '@/assets/images/publisher-logo.png';
import imageOne from '@/assets/images/shops/product-image-1.png';
import imageTwo from '@/assets/images/shops/product-image-2.png';
import imageThree from '@/assets/images/shops/product-image-3.png';
import imageFour from '@/assets/images/shops/product-image-4.png';
import ProductBanner from '../product-banner';
import ProductInfo from '../product-info';
import ShoppingButton from '../shopping-button';

function Background() {
  return (
    <div className='absolute top-0 left-0 right-0 h-[502px]'>
      <Image
        src={background}
        alt='Third section bg'
        layout='fill'
        objectFit='cover'
      />
    </div>
  )
}

export default function ThirdSection() {
  const products = [
    {
      author: {
        name: 'Betasoft',
        logo: publisherLogo,
      },
      product: {
        name: 'Dashify WordPress Elementor ...',
        image: imageOne,
        price: 0,
      }
    },
    {
      author: {
        name: 'Betasoft',
        logo: publisherLogo,
      },
      product: {
        name: 'Dashify WordPress Elementor ...',
        image: imageTwo,
        price: 45,
      }
    },
    {
      author: {
        name: 'Betasoft',
        logo: publisherLogo,
      },
      product: {
        name: 'Dashify WordPress Elementor ...',
        image: imageThree,
        price: 0,
      }
    },
    {
      author: {
        name: 'Betasoft',
        logo: publisherLogo,
      },
      product: {
        name: 'Dashify WordPress Elementor ...',
        image: imageFour,
        price: 45,
      }
    },
  ]
  
  return (
    <section className='relative max-w-[1728px] mx-auto'>
      <Background />
      <div className='pt-[205px]'>
        <div className='px-[105px]'>
          <BannerWide />
        </div>
        <div className='mt-[51px] px-[60px]'>
          <AllProduct />
        </div>
        <div className='px-[72px] py-[78px] grid grid-cols-2 gap-x-[81px] gap-y-[45px]'>
          { products.map(({ author, product }) => (
            <div>
              <ProductBanner
                image={product.image}
                price={product.price}
                wide
              />
              <div className='mt-[28px] flex items-center justify-between'>
                <ProductInfo
                  author={author.name}
                  logo={author.logo}
                  name={product.name}
                />
                <div className='pr-[8px]'>
                  <ShoppingButton yellowLime />
                </div>
              </div>
            </div>
          )) }
        </div>
      </div>
    </section>
  )
}