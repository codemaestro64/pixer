// import Seo from '@/layouts/_seo';
import Image from '@/components/ui/image';
import heroImage from '@/assets/images/shops/tertiary/tertiary-hero.png';
import DigishopLogo from '@/components/shops/digishop-logo';
import TertiaryHero from '@/components/shops/tertiary/tertiary-hero';
import TrendingProducts from '@/components/shops/tertiary/trending-products';
import SectionBackdrop from '@/components/shops/secondary/section-backdrop';
import Banner from '@/components/shops/banner';
import BannerAlt from '@/components/shops/banner-alt';
import AllProduct from '@/components/shops/all-product';
import TertiaryProducts from '@/components/shops/tertiary/tertiary-products';

export default function PrimaryPage() {
  return (
    <>
      {/* <Seo
        title=''
        description=''
        url={}
      /> */}
      <div className='min-h-full bg-white overflow-hidden'>
        <section className='relative min-h-[1117px] max-w-[1728px] mx-auto overflow-hidden '>
          <Image
            src={heroImage}
            alt='Tertiary Hero'
            layout='fill'
            objectFit='cover'
            className='z-[1] select-none'
          />
          <div className='relative z-[2]'>
            <div className='max-w-[1606px] mx-auto'>
              <div className='pt-[62px] px-[50px]'>
                <DigishopLogo dark />
              </div>
              <div className='mt-[198px] px-[126px]'>
                <TertiaryHero title='Build better business with ready to use' />
              </div>
            </div>
          </div>
        </section>

        <section className='max-w-[1728px] mx-auto mb-[146px]'>
          <TrendingProducts />
        </section>
        <SectionBackdrop variant='light'>
          <div className='max-w-[1606px] mx-auto relative z-[10]'>
            <div className='mt-[66px] px-[38px] grid gap-[20px] grid-cols-[1fr_553px]'>
              <Banner yellow />
              <BannerAlt textDark />
            </div>
            <div className='mt-[47px]'>
              <AllProduct dark />
            </div>
            <div className='mt-[38px] px-[42px] pb-[90px]'>
              <TertiaryProducts />
            </div>
          </div>
        </SectionBackdrop>
      </div>
    </>
  )
}