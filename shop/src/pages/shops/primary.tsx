// import Seo from '@/layouts/_seo';
import DigishopLogo from "@/components/shops/digishop-logo";
import PrimaryButton from "@/components/shops/primary/primary-button";
import PrimaryCarousel from "@/components/shops/primary/primary-carousel";
import PrimaryTitle from "@/components/shops/primary/primary-title";

export default function PrimaryPage() {
  return (
    <>
      {/* <Seo
        title=""
        description=""
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
          <div className='mt-[62px] pt-[82px]'></div>
        </div>
      </div>
    </>
  )
}