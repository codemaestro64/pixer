import Image from '@/components/ui/image';
import firstSectionImage from '@/assets/images/shops/secondary/first-section.png';
import secondSectionImage from '@/assets/images/shops/secondary/second-section.png';

interface SectionBgProps {
  children?: React.ReactNode;
  first?: boolean;
  second?: boolean;
}

export default function SectionBg({ children, first, second }: SectionBgProps) {
  let image: StaticImageData | null = null;

  if (first) {
    image = firstSectionImage
  } else if (second) {
    image = secondSectionImage
  }
  
  return (
    <section className='relative min-h-[1117px] max-w-[1728px] mx-auto overflow-hidden '>
      { image ? (
        <Image
          src={image}
          alt='Section Background'
          layout='fill'
          objectFit='cover'
          className='z-[1] select-none'
        />
      ) : null }
      <div className='relative z-[2]'>
        { children }
      </div>
    </section>
  )
}