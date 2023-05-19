import { useState , useRef, useEffect } from 'react';

import Image from '@/components/ui/image';
import centerImage from '@/assets/images/shops/image-1.png';
import imageTwo from '@/assets/images/shops/image-2.png';
import imageThree from '@/assets/images/shops/image-3.png';
import imageFour from '@/assets/images/shops/image-4.png';
import { ArrowLeftLineIcon } from '@/components/icons/arrow-left-line-icon';
import { StarIcon } from '@/components/icons/star-icon';
import { DownloadAltIcon } from '@/components/icons/download-alt-icon';

interface CarouselImageProps {
  image: StaticImageData;
  alt: string;
  center?: boolean;
  second?: boolean;
  third?: boolean;
  left?: boolean;
  animate: boolean;
}

function CarouselButton({ rotate, animate, left }: { rotate?: boolean, animate: boolean, left?: boolean }) {
  return (
    <button className={`absolute z-[4] top-1/2 -translate-y-1/2 -translate-x-1/2 transition-opacity duration-500 ${
      left ? 'left-[calc(50%-800px)]' : 'left-[calc(50%+800px)]'
    } ${
      !animate ? 'opacity-0' : 'opacity-100 delay-500'
    }`}>
      <ArrowLeftLineIcon className={`w-[42px] h-[42px] text-white ${
        rotate ? 'rotate-180' : ''
      }`} />
    </button>
  )
}

function CarouselImage({ image, alt, center, second, third, left, animate }: CarouselImageProps) {
  function getClasses() {
    if (center) {
      const style = !animate ? 'w-[1013.17px] h-[675.87px] delay-500' : 'w-[860.26px] h-[573.87px]';
      return `left-1/2 z-[3] duration-1000 ${ style }`;
    } else if (second) {
      const style = !animate ? `w-[626.41px] h-[417.87px] delay-500 ${
        left ? 'left-[calc(50%-476px)]' : 'left-[calc(50%+476px)]'
      }` : `w-[531.87px] h-[354.81px] ${
        left ? 'left-[calc(50%-390px)]' : 'left-[calc(50%+390px)]'
      }`;

      return `z-[2] duration-1000 ${ style }`;
    } else if (third) {
      const animation = !animate ? 'opacity-0' : 'delay-[600ms] opacity-100';
      const side = left ? 'left-[calc(50%-566px)]' : 'left-[calc(50%+566px)]';

      return `w-[398.46px] h-[265.81px] z-[1] duration-500 ${ side } ${ animation }`;
    }
  }
  
  return (
    <div className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all ${getClasses()}`}>
      <Image src={image} alt={alt} layout='fill' objectFit='cover' />
      { center ? (
        <div className={`absolute top-full left-0 right-0 py-[20px] px-[10px] transition-opacity duration-500 ${
          !animate ? 'invisible opacity-0' : 'delay-700 visible opacity-100'
        }`}>
          <div className='space-y-[16px]'>
            <div className='text-[28px] font-bold text-white font-poppins'>
              Estrella Motion Picture Poster and Walls 
            </div>
            <div className='flex items-center space-x-[24px]'>
              <div className='flex items-center'>
                <StarIcon className='h-[20px] w-[20px] mr-[17.25px] text-[#FFC42C]' />
                <span className='text-[19.71px] text-[#FEFEFE] font-poppins font-semibold'>
                  4.8
                </span>
              </div>
              <div className='flex items-center'>
                <DownloadAltIcon className='h-[20px] w-[20px] mr-[17.25px] text-white' />
                <span className='text-[19.71px] text-[#FEFEFE] font-poppins font-semibold'>
                  2.6k downloads
                </span>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      ): null }
    </div>
  )
}

export default function PrimaryCarousel() {
  const [animate, setAnimate] = useState(false);
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onUserScroll() {
      if (elRef.current === null) return;
      const { current: el } = elRef;
      const triggerHeight = window.innerHeight / 2;
      const { top: topOfElement } = el.getBoundingClientRect();
      setAnimate(topOfElement < triggerHeight ? true : false);
    }
    
    window.addEventListener('scroll', onUserScroll)
    return () => window.removeEventListener('scroll', onUserScroll)
  }, [animate]);
  
  return (
    <div className='relative h-[675.87px]' ref={elRef}>
      <CarouselImage image={centerImage} alt='Center' center animate={animate} />
      <CarouselImage image={imageTwo} alt='Second left' second left animate={animate} />
      <CarouselImage image={imageThree} alt='Second right' second animate={animate} />
      <CarouselImage image={imageTwo} alt='Third left' third left animate={animate} />
      <CarouselImage image={imageFour} alt='Third right' third animate={animate} />
      <CarouselButton left animate={animate} />
      <CarouselButton rotate animate={animate} />
    </div>
  )
}