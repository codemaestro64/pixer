// import Seo from '@/layouts/_seo';
import DigishopLogo from '@/components/shops/digishop-logo';
import PrimaryButton from '@/components/shops/primary/primary-button';
import PrimaryCarousel from '@/components/shops/primary/primary-carousel';
import PrimaryTitle from '@/components/shops/primary/primary-title';
import Banner from '@/components/shops/banner';
import BannerAlt from '@/components/shops/banner-alt';
import AllProduct from '@/components/shops/all-product';
import PrimaryProducts from '@/components/shops/primary/primary-products';

export default function PrimaryPage() {
  return (
    <>
      {/* <Seo
        title=''
        description=''
        url={}
      /> */}
      <div className='min-h-full bg-[#7B5BD7] overflow-hidden'>
        <div className='max-w-[1606px] mx-auto'>
          <div className='pt-[62px] px-[51px]'>
            <DigishopLogo />
          </div>
          <header className='mt-[114px]'>
            <div className='max-w-[1400px] mx-auto'>
              <PrimaryTitle title='Boost Your Business with Easy To Use Templates' />
            </div>
            <div className='mt-[38px] flex justify-center gap-[27px]'>
              <PrimaryButton value='Explore our product' primary />
              <PrimaryButton value='Save to favorite' />
            </div>
          </header>
          <div className='mt-[101px]'>
            <PrimaryCarousel />
          </div>
          <div className='mt-[62px] pt-[82px] px-[38px] grid gap-[20px] grid-cols-[1fr_553px]'>
            <Banner />
            <BannerAlt />
          </div>
          <div className='mt-[50px]'>
            <AllProduct />
          </div>
          <div className='mt-[60px] pb-[60px] px-[10px]'>
            <PrimaryProducts />
          </div>
        </div>
      </div>
    </>
  )
}