import ProductBanner from '../product-banner';
import ProductInfo from '../product-info';
import SecondaryButton from '../secondary-button';
import authorLogo from '@/assets/images/publisher-logo.png';
import productImageOne from '@/assets/images/shops/product-image-1.png';
import productImageTwo from '@/assets/images/shops/product-image-2.png';
import productImageThree from '@/assets/images/shops/product-image-3.png';

export default function TertiaryProducts() {
  const products = [
    {
      name: 'Dashify WordPress Elementor...',
      logo: authorLogo,
      image: productImageOne,
      author: 'Betasoft',
      price: 0,
    },
    {
      name: 'Dashify WordPress Elementor...',
      logo: authorLogo,
      image: productImageTwo,
      author: 'Betasoft',
      price: 45,
    },
    {
      name: 'Dashify WordPress Elementor...',
      logo: authorLogo,
      image: productImageThree,
      author: 'Betasoft',
      price: 0,
    },
  ]

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-[26px] xl:gap-[64px] 2xl:gap-[128px]'>
      { products.map(({ name, logo, image, author, price }, index) => (
        <div key={index}>
          <ProductBanner image={image} price={price} />
          <div className='p-[10px] mt-[14px]'>
            <ProductInfo
              author={author}
              logo={logo}
              name={name}
              dark
            />
            <div className='mt-[14px] space-y-[26px]'>
              <SecondaryButton label='Checkout' primary dark wide />
              <SecondaryButton label='Add To Cart' dark wide />
            </div>
          </div>
        </div>
      )) }
    </div>
  )
}