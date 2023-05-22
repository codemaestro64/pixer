import ProductBanner from '../product-banner';
import productImageOne from '@/assets/images/shops/product-image-1.png';
import productImageTwo from '@/assets/images/shops/product-image-2.png';
import productImageThree from '@/assets/images/shops/product-image-3.png';
import productImageFour from '@/assets/images/shops/product-image-4.png';
import authorLogo from '@/assets/images/publisher-logo.png';
import ProductInfo from '../product-info';
import ShoppingButton from '../shopping-button';

export default function PrimaryProducts() {
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
    {
      name: 'Dashify WordPress Elementor...',
      logo: authorLogo,
      image: productImageFour,
      author: 'Betasoft',
      price: 45,
    },
  ]
  
  return (
    <div className='grid grid-cols-2 gap-x-[80px] gap-y-[46px]'>
      { products.map(({ name, price, author, logo, image }, index) => (
        <div key={index}>
          <ProductBanner image={image} price={price} wide />
          <div className='mt-[28px] py-[18px] pr-[14px] flex justify-between'>
            <ProductInfo author={author} name={name} logo={logo} />
            <ShoppingButton />
          </div>
        </div>
      )) }
    </div>
  )
}