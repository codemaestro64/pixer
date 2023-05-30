import { useState } from 'react';
import Image from '@/components/ui/image';
import { DiagonalArrowSquareIcon } from '@/components/icons/diagonal-arrow-square-icon';
import secondSectionBanner from '@/assets/images/shops/quaternary/image-1-dark.png';
import RatingDownloads from '../rating-downloads';
import imageOne from '@/assets/images/shops/quaternary/image-1.png';
import imageTwo from '@/assets/images/shops/quaternary/image-2.png';
import imageThree from '@/assets/images/shops/quaternary/image-3.png';
import imageFour from '@/assets/images/shops/quaternary/image-4.png';
import imageFive from '@/assets/images/shops/quaternary/image-5.png';
import imageSix from '@/assets/images/shops/quaternary/image-6.png';
import imageSeven from '@/assets/images/shops/quaternary/image-7.png';

function Button({ label, primary }: { label: string, primary?: boolean }) {
  const styles = primary ?
    'text-[#010101] bg-[#BFFF07]' :
    'text-[#BFFF07]'
  
  return (
    <button className={`${ styles } px-[30px] py-[20px] min-w-[317px] text-center border border-[#BFFF07] text-[22px] font-poppins font-bold`}>
      { label }
    </button>
  )
}

function SelectedProduct() {
  return (
    <div className='relative min-h-[595px]'>
      {/* image */}
      <div className='absolute z-[1] inset-0 overflow-hidden'>
        <Image
          src={secondSectionBanner}
          alt='Second section banner'
          layout='fill'
          objectFit='cover'
        />
      </div>
      {/* gradient */}
      <div className='absolute inset-0 z-[2] bg-gradient-to-b from-[transparent_21%] to-[#010101_64%]'></div>
      {/* button */}
      <button className='absolute top-[36px] right-[64px] flex items-center justify-center z-[3]'>
        <DiagonalArrowSquareIcon className='w-[40px] h-[40px] text-white' />
      </button>
      {/* content */}
      <div className='relative z-[3] pt-[318px] pl-[99px] pr-[120px]'>
        <div className='flex justify-between'>
          <div>
            <div className='max-w-[585px]'>
              <h2 className='text-[47.58px] text-[#BFFF07] font-poppins font-bold truncate-text-line-two'>
                Estrella Motion Picture Poster and Walls
              </h2>
            </div>
            <div className='mt-[16px]'>
              <RatingDownloads rating='4.8' downloads='2.6k' large />
            </div>
          </div>
          <div className='flex flex-col items-end justify-end'>
            <div className='px-[30px] py-[20px] min-w-[317px] text-right'>
              <div className='text-[26px] text-[#BFFF07] font-poppins font-bold'>
                &#36;&nbsp;45.00
              </div>
            </div>
            <div className='flex gap-[20px] mt-[28px]'>
              <Button label='Add to cart' />
              <Button label='Buy Now' primary />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SecondSection() {
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const products = [
    { image: imageOne },
    { image: imageTwo },
    { image: imageThree },
    { image: imageFour },
    { image: imageFive },
    { image: imageSix },
    { image: imageSeven },
  ]
  
  return (
    <section className='max-w-[1728px] mx-auto'>
      <SelectedProduct />
      <div className='flex overflow-x-auto scrollbar-hide'>
        <div className='flex-1 flex gap-[15px] px-[28px] pt-[124px] pb-[66px]'>
          { products.map(({ image }, index) => {
            const style =  activeProductIndex === index ? 'w-[305.28px] h-[447.57px] mt-[-101.57px] shadow-[-2px_2px_20px_rgb(255,122,0)]' : 'w-[236px] h-[346px]';
            return (
              <div
                key={index}
                onClick={() => setActiveProductIndex(index)}
                className={`relative transition-all duration-300 ${ style }`
              }>
                <Image
                  src={image}
                  alt='Product'
                  layout='fill'
                  objectFit='contain'
                />
              </div>
            )
          }) }
        </div>
      </div>
    </section>
  )
}