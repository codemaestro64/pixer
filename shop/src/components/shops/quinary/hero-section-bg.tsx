import Image from '@/components/ui/image';
import heroImage from '@/assets/images/shops/quinary/quinary-hero.png';

export default function HeroSectionBg({ children }: { children: React.ReactElement }) {
  return (
    <section className='relative min-h-[1117px] max-w-[1728px] mx-auto overflow-hidden '>
      <Image
        src={heroImage}
        alt='Quinary Hero'
        layout='fill'
        objectFit='cover'
        className='z-[1] select-none'
      />
      <div className='relative z-[2]'>
        { children }
      </div>
    </section>
  )
}