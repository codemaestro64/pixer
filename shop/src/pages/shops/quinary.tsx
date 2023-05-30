// import Seo from '@/layouts/_seo';
import HeroSectionBg from '@/components/shops/quinary/hero-section-bg';
import SlogoLogo from '@/components/shops/quinary/slogo-logo';
import HeroIntroduction from '@/components/shops/quinary/hero-introduction';
import LabelViewAll from '@/components/shops/quinary/label-view-all';
import ProductGallery from '@/components/shops/quinary/product-gallery';
import QuinaryBanner from '@/components/shops/quinary/quinary-banner';
import QuinaryBannerAlt from '@/components/shops/quinary/quinary-banner-alt';
import QuinaryProducts from '@/components/shops/quinary/quinary-products';

export default function QuinaryPage() {
  return (
    <>
      {/* <Seo
        title=''
        description=''
        url={}
      /> */}
      <div className='min-h-full bg-white dark:bg-[#010101] overflow-hidden'>
        <HeroSectionBg>
          <div className='pt-[122px] px-[148px]'>
            <SlogoLogo />
            <div className='mt-[158px]'>
              <HeroIntroduction />
            </div>
          </div>
        </HeroSectionBg>
        <section className='max-w-[1728px] mx-auto'>
          <div className='px-[60px] pt-[48px]'>
            <LabelViewAll label='Top Product' />
          </div>
          <div className='mt-[36px]'>
            <ProductGallery />
          </div>
        </section>
        <section className='mt-[38px] max-w-[1728px] mx-auto'>
          <div className='px-[58px] grid gap-[23px] grid-cols-[1fr_543px]'>
            <QuinaryBanner />
            <QuinaryBannerAlt />
          </div>
        </section>
        <section className='mt-[56px] max-w-[1728px] mx-auto'>
          <div className='px-[61px]'>
            <LabelViewAll label='Latest Product' />
          </div>
          <div className='mt-[28px] pb-[62px]'>
            <QuinaryProducts />
          </div>
        </section>
      </div>
    </>
  )
}