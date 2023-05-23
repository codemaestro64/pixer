// import Seo from '@/layouts/_seo';
import AllProduct from '@/components/shops/all-product';
import Banner from '@/components/shops/banner';
import BannerAlt from '@/components/shops/banner-alt';
import DigishopLogo from '@/components/shops/digishop-logo';
import SecondaryHero from '@/components/shops/secondary/secondary-hero';
import SecondaryProducts from '@/components/shops/secondary/secondary-products';
import SectionBackdrop from '@/components/shops/secondary/section-backdrop';
import SectionBg from '@/components/shops/secondary/section-bg';
import TrendingProducts from '@/components/shops/secondary/trending-products';
import ViewAll from '@/components/shops/view-all';

export default function PrimaryPage() {
  return (
    <>
      {/* <Seo
        title=''
        description=''
        url={}
      /> */}
      <div className='min-h-full bg-[#0E0725] overflow-hidden'>
        <SectionBg first>
          <div className='max-w-[1606px] mx-auto'>
            <div className='pt-[62px] px-[50px]'>
              <DigishopLogo />
            </div>
            <div className='mt-[270px] px-[126px]'>
              <SecondaryHero title='Build better business with ready to use' />
            </div>
          </div>
        </SectionBg>
        <SectionBg second>
          <div className='max-w-[1606px] mx-auto'>
            <div className='pt-[160px] pr-[68px] flex justify-end'>
              <ViewAll />
            </div>
            <div className='mt-[74px] pl-[32px] pr-[23px]'>
              <TrendingProducts />
            </div>
          </div>
        </SectionBg>
        <SectionBackdrop>
          <div className='max-w-[1606px] mx-auto relative z-[10]'>
            <div className='mt-[62px] pt-[65px] px-[38px] grid gap-[20px] grid-cols-[1fr_553px]'>
              <Banner green />
              <BannerAlt greenBanner textDark />
            </div>
            <div className='mt-[47px]'>
              <AllProduct />
            </div>
            <div className='mt-[38px] px-[42px] pb-[90px]'>
              <SecondaryProducts />
            </div>
          </div>
        </SectionBackdrop>
      </div>
    </>
  )
}