import Image from '@/components/ui/image';
import ShopaiLogo from './shopai-logo';
import QuaternaryHero from './quaternary-hero';
import heroImage from '@/assets/images/shops/quaternary/quaternary-hero.png';

export default function FirstSection() {
  return (
    <section className='relative min-h-[1117px] max-w-[1728px] mx-auto overflow-hidden '>
      <Image
        src={heroImage}
        alt='Quaternary Hero'
        layout='fill'
        objectFit='cover'
        className='z-[1] select-none'
      />
      <div className='relative z-[2]'>
        <div className='max-w-[1606px] mx-auto'>
          <div className='pt-[80px] px-[108px]'>
            <ShopaiLogo />
            <div className='mt-[170px]'>
              <QuaternaryHero
                title='Boost Your Business with Easy To Use Templates'
                subtitle='Get hands on professional design templates to boost your business'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}