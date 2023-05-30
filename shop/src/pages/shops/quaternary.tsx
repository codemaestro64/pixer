// import Seo from '@/layouts/_seo';
import FirstSection from '@/components/shops/quaternary/first-section';
import SecondSection from '@/components/shops/quaternary/second-section';
import ThirdSection from '@/components/shops/quaternary/third-section';

export default function QuaternaryPage() {
  return (
    <>
      {/* <Seo
        title=''
        description=''
        url={}
      /> */}
      <div className='min-h-full bg-[#020201] overflow-hidden'>
        <FirstSection />
        <SecondSection />
        <ThirdSection />
      </div>
    </>
  )
}